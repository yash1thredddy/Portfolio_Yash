'use client';

import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import { ChatRequestOptions } from 'ai';
import type { UIMessage as Message } from 'ai';
import React, { useState, useEffect, useTransition, startTransition } from 'react';
import ChatMessageContent from './chat-message-content';
import ToolRenderer from './tool-renderer';
import { SuggestedQuestions, getSuggestedQuestions } from './suggested-questions';
import { usePerformance } from '@/contexts/PerformanceContext';

interface SimplifiedChatViewProps {
  message: Message;
  isLoading: boolean;
  reload: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  addToolResult?: (args: { toolCallId: string; result: string }) => void;
  onQuestionClick?: (question: string) => void;
}

export const SimplifiedChatView = React.memo(function SimplifiedChatView({
  message,
  isLoading,
  reload,
  addToolResult,
}: SimplifiedChatViewProps) {
  const [shouldRenderTools, setShouldRenderTools] = useState(false);
  const [isPending, startToolTransition] = useTransition();
  const { startHeavyRendering, stopHeavyRendering } = usePerformance();

  if (message.role !== 'assistant') return null;

  // Extract tool invocations. AI SDK v5 emits `tool-${name}` parts
  const toolInvocations =
    message.parts
      ?.flatMap((part: any) => {
        // AI SDK v5 format: tool parts have type 'tool-${toolName}'
        if (typeof part?.type === 'string' && part.type.startsWith('tool-')) {
          const toolName = part.type.slice('tool-'.length); // Extract tool name from type
          const toolCallId = part.toolCallId || part.id;
          const output = part.output ?? part.result;

          // Only include tools that have output available
          if (toolName && part.state === 'output-available' && output) {
            return [
              {
                toolName,
                toolCallId: toolCallId || `${toolName}-${Date.now()}`,
                state: 'result',
                args: part.input || part.args || {},
                result: output,
              },
            ];
          }
        }

        return [];
      })
      .filter(Boolean) || [];

  // Only display the first tool (if any)
  const currentTool = toolInvocations.length > 0 ? [toolInvocations[0]] : [];

  const textContent =
    message.parts
      ?.filter((part: any) => part.type === 'text')
      // @ts-ignore - text part shape
      .map((part: any) => part.text)
      .join('') || '';

  const hasTextContent = textContent.trim().length > 0;
  const hasTools = currentTool.length > 0;

  // Show visual content IMMEDIATELY so users can see/explore while AI generates response
  // Pause cursor effects during heavy rendering for better performance
  useEffect(() => {
    if (hasTools) {
      // Set immediately - no delay
      setShouldRenderTools(true);
    } else {
      setShouldRenderTools(false);
    }
  }, [hasTools]);

  // Pause cursor during entire response generation (streaming + rendering)
  useEffect(() => {
    if (isLoading || (hasTools && !shouldRenderTools)) {
      // Pause cursor while AI is generating response or heavy components are rendering
      startHeavyRendering();
    } else if (!isLoading && shouldRenderTools) {
      // Resume cursor after response is complete and components are rendered
      // Add small delay to ensure rendering is complete
      const timer = setTimeout(() => {
        stopHeavyRendering();
      }, 500);
      
      return () => {
        clearTimeout(timer);
      };
    }
    
    // Cleanup on unmount
    return () => {
      stopHeavyRendering();
    };
  }, [isLoading, hasTools, shouldRenderTools, startHeavyRendering, stopHeavyRendering]);

  return (
    <div className="flex h-full w-full flex-col px-4">
      {/* Single scrollable container for both tool and text content */}
      <div className="custom-scrollbar flex h-full w-full flex-col overflow-y-auto" style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
        {/* Tool invocation result - displayed IMMEDIATELY at the top */}
        {/* Shows visual content (images, cards) while AI response streams below */}
        {hasTools && (
          <div className="mb-4 w-full animate-in slide-in-from-top-4 fade-in duration-300">
            {/* Add subtle indicator if still loading */}
            {isLoading && (
              <div className="mb-2 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500"></div>
                <span>Generating response...</span>
              </div>
            )}
            <ToolRenderer
              toolInvocations={currentTool}
              messageId={message.id || 'current-msg'}
            />
          </div>
        )}

        {/* Text content - streams BELOW the visual content */}
        {hasTextContent && (
          <div className="w-full animate-in fade-in duration-200">
            {hasTools && (
              <div className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                AI Response:
              </div>
            )}
            <ChatBubble variant="received" className="w-full">
              <ChatBubbleMessage className="w-full">
                <ChatMessageContent
                  message={message}
                  isLast={true}
                  isLoading={isLoading}
                  reload={reload}
                  addToolResult={addToolResult}
                  skipToolRendering={true}
                />
              </ChatBubbleMessage>
            </ChatBubble>
          </div>
        )}

        {/* Add some padding at the bottom for better scrolling experience */}
        <div className="pb-8"></div>
      </div>
    </div>
  );
});
