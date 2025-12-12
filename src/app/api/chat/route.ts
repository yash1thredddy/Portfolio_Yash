import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, stepCountIs } from 'ai';
// Temporarily disabled LRU cache to fix migration issues
// import { LRUCache } from 'lru-cache';
import { SYSTEM_PROMPT } from './prompt';
// Temporarily using uncached versions to fix migration issues
import { getProjects } from './tools/getProjects';
import { getPresentation } from './tools/getPresentation';
import { getResume } from './tools/getResume';
import { getContact } from './tools/getContact';
import { getSkills } from './tools/getSkills';
import { getSports } from './tools/getSports';
import { getCrazy } from './tools/getCrazy';
import { getInternship } from './tools/getInternship';
import { getWeather } from './tools/getWeather';
// import { getCacheStats } from './cache-utils';

// Validate API key is present
const apiKey = process.env.DEEPSEEK_API_KEY;
if (!apiKey) {
  throw new Error(
    'DEEPSEEK_API_KEY environment variable is not set. ' +
    'Please add it to your .env file. See .env.example for reference.'
  );
}

// Initialize DeepSeek client with OpenAI-compatible API
const deepseek = createOpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey,
  fetch: async (url, init) => {
    // DeepSeek doesn't support OpenAI "developer" role.
    // The OpenAI adapter marks unknown model IDs as reasoning models and
    // auto-converts system messages to developer. Rewrite them here.
    if (init?.body) {
      let bodyText: string | undefined;
      if (typeof init.body === 'string') {
        bodyText = init.body;
      } else if (init.body instanceof Uint8Array) {
        bodyText = new TextDecoder().decode(init.body);
      } else if (init.body instanceof ArrayBuffer) {
        bodyText = new TextDecoder().decode(new Uint8Array(init.body));
      } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(init.body)) {
        bodyText = init.body.toString('utf8');
      }

      if (bodyText) {
        try {
          const parsed = JSON.parse(bodyText);
          if (Array.isArray(parsed?.messages)) {
            parsed.messages = parsed.messages.map((m: any) =>
              m?.role === 'developer' ? { ...m, role: 'system' } : m
            );
            init = { ...init, body: JSON.stringify(parsed) };
          }
        } catch {
          // ignore non-JSON bodies
        }
      }
    }

    // Add timeout and retry logic
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 second timeout

    try {
      const response = await fetch(url, {
        ...init,
        signal: controller.signal,
        headers: {
          ...init?.headers,
          'Connection': 'keep-alive',
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('[DEEPSEEK-API] Fetch error:', error);
      throw error;
    }
  },
});

export const maxDuration = 60; // Increased to 60 seconds

// Constants for validation
const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 10000;

// DeepSeek/OpenAI-compatible roles: system|user|assistant|tool
function normalizeRoles(messages: any[]): any[] {
  return messages.map((m) => {
    if (!m || typeof m !== 'object') return m;
    if (m.role === 'developer') {
      return { ...m, role: 'system' };
    }
    return m;
  });
}

// Removed custom toModelMessages - using AI SDK's built-in convertToModelMessages instead

// Temporarily disabled LRU cache to fix migration issues
// Initialize LRU cache for responses
// Cache up to 100 responses, with 15-minute TTL
// const responseCache = new LRUCache<string, string>({
//   max: 100, // Maximum number of items in cache
//   ttl: 1000 * 60 * 15, // 15 minutes in milliseconds
//   updateAgeOnGet: true, // Reset TTL on cache hit
//   updateAgeOnHas: false,
// });

// Helper function to create cache key from messages
// function createCacheKey(messages: any[]): string {
//   // Create a deterministic key from the last user message
//   // We only cache single-turn conversations for simplicity
//   if (messages.length === 1 && messages[0].role === 'user') {
//     const content = typeof messages[0].content === 'string'
//       ? messages[0].content
//       : JSON.stringify(messages[0].content);
//     // Normalize and hash the content
//     return `chat:${content.toLowerCase().trim().substring(0, 200)}`;
//   }
//   return ''; // Don't cache multi-turn conversations
// }

// ❌ Pas besoin de l'export ici, Next.js n'aime pas ça
function errorHandler(error: unknown) {
  if (error == null) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawMessages =
      body?.messages ??
      body?.chat?.messages ??
      body?.data?.messages;
    let messages = rawMessages;

    // Validate messages array
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: messages must be an array' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: messages array is empty' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (messages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({ error: 'Too many messages in request' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate message content length
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      if (msg.content && typeof msg.content === 'string' && msg.content.length > MAX_MESSAGE_LENGTH) {
        return new Response(
          JSON.stringify({ error: `Message ${i} exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters` }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    console.log('[CHAT-API] Incoming messages:', messages);

    messages = normalizeRoles(messages);

    const tools = {
      getProjects,
      getPresentation,
      getResume,
      getContact,
      getSkills,
      getSports,
      getCrazy,
      getInternship,
      getWeather,
    };

    try {
      // AI SDK v5: Use built-in convertToModelMessages
      const modelMessages = convertToModelMessages(messages);

      console.log('[CHAT-API] Calling streamText with', modelMessages.length, 'messages');

      // AI SDK v5: streamText with multi-step tool calling
      const result = streamText({
        model: deepseek.chat('deepseek-chat'),
        system: SYSTEM_PROMPT.content,
        messages: modelMessages,
        tools,
        // CRITICAL: Enable multi-step tool calling
        // This allows the AI to call tools AND generate text responses
        stopWhen: stepCountIs(5), // Allow up to 5 steps for tool calls + text generation
        // Monitor each step completion
        onStepFinish: async (event) => {
          console.log('[CHAT-API] Step finished:', {
            finishReason: event.finishReason,
            text: event.text?.substring(0, 100) || '(no text)',
            toolCalls: event.toolCalls?.length || 0,
            toolResults: event.toolResults?.length || 0,
          });
        },
        // Monitor final completion
        onFinish: async (event) => {
          console.log('[CHAT-API] All steps finished:', {
            finishReason: event.finishReason,
            text: event.text?.substring(0, 100) || '(no text)',
            usage: event.usage,
            steps: event.steps?.length || 0,
          });
        },
      });

      console.log('[CHAT-API] streamText result obtained, converting to response');

      // AI SDK v5: Return UI message stream response for useChat hook
      // This properly streams both tool calls AND text to the client
      return result.toUIMessageStreamResponse();
    } catch (streamError: any) {
      // Handle streaming/connection errors specifically
      console.error('[CHAT-API] Stream error:', streamError);

      // Check for connection reset or timeout errors
      if (streamError?.code === 'ECONNRESET' ||
          streamError?.cause?.code === 'ECONNRESET' ||
          streamError?.name === 'AbortError') {
        return new Response(
          JSON.stringify({
            error: 'Connection to AI service was interrupted. Please try again.',
            details: 'The connection was reset or timed out.'
          }),
          {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      throw streamError; // Re-throw if not a connection error
    }
  } catch (err) {
    console.error('[CHAT-API] Global error:', err);
    const errorMessage = errorHandler(err);
    return new Response(
      JSON.stringify({
        error: errorMessage,
        message: 'An unexpected error occurred. Please refresh and try again.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
