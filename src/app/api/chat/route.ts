import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { LRUCache } from 'lru-cache';
import { SYSTEM_PROMPT } from './prompt';
import {
  getProjectsCached as getProjects,
  getPresentationCached as getPresentation,
  getResumeCached as getResume,
  getContactCached as getContact,
  getSkillsCached as getSkills,
  getSportsCached as getSports,
  getCrazyCached as getCrazy,
  getInternshipCached as getInternship,
  getWeatherCached as getWeather,
} from './tools-cached';
import { getCacheStats } from './cache-utils';

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

// Initialize LRU cache for responses
// Cache up to 100 responses, with 15-minute TTL
const responseCache = new LRUCache<string, string>({
  max: 100, // Maximum number of items in cache
  ttl: 1000 * 60 * 15, // 15 minutes in milliseconds
  updateAgeOnGet: true, // Reset TTL on cache hit
  updateAgeOnHas: false,
});

// Helper function to create cache key from messages
function createCacheKey(messages: any[]): string {
  // Create a deterministic key from the last user message
  // We only cache single-turn conversations for simplicity
  if (messages.length === 1 && messages[0].role === 'user') {
    const content = typeof messages[0].content === 'string'
      ? messages[0].content
      : JSON.stringify(messages[0].content);
    // Normalize and hash the content
    return `chat:${content.toLowerCase().trim().substring(0, 200)}`;
  }
  return ''; // Don't cache multi-turn conversations
}

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
    const { messages } = body;

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
    console.log('[CACHE-STATS]', getCacheStats());

    // Check cache for single-turn conversations
    const cacheKey = createCacheKey(messages);
    if (cacheKey) {
      const cachedResponse = responseCache.get(cacheKey);
      if (cachedResponse) {
        console.log('[CHAT-API] Cache hit for:', cacheKey);
        // Return cached response as a stream
        return new Response(cachedResponse, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'X-Cache-Status': 'HIT',
          },
        });
      }
      console.log('[CHAT-API] Cache miss for:', cacheKey);
    }

    messages.unshift(SYSTEM_PROMPT);

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
      const result = streamText({
        model: deepseek('deepseek-chat'),
        messages,
        toolCallStreaming: true,
        tools,
        maxSteps: 2,
      });

      // For cacheable requests, store the response
      // Note: Streaming responses are harder to cache, so we'll cache after completion
      // For now, we'll add a header to indicate cache miss
      const response = result.toDataStreamResponse({
        getErrorMessage: errorHandler,
      });

      // Add cache status header
      response.headers.set('X-Cache-Status', 'MISS');

      return response;
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
