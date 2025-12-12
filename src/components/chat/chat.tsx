'use client';
import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

// Component imports
import ChatBottombar from '@/components/chat/chat-bottombar';
import ChatLanding from '@/components/chat/chat-landing';
import ChatMessageContent from '@/components/chat/chat-message-content';
import { SimplifiedChatView } from '@/components/chat/simple-chat-view';
import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import WelcomeModal from '@/components/welcome-modal';
import { Info } from 'lucide-react';
import { ContactIcons } from '../ui/contact-icons';
import HelperBoost from './HelperBoost';

// ClientOnly component for client-side rendering
//@ts-ignore
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

// Define Avatar component props interface
interface AvatarProps {
  hasActiveTool: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isTalking: boolean;
}

// Dynamic import of Avatar component
const Avatar = dynamic<AvatarProps>(
  () =>
    Promise.resolve(() => {
      return (
        <div
          className="flex items-center justify-center rounded-full overflow-hidden h-24 w-24"
        >
          <div
            className="relative cursor-pointer"
            onClick={() => (window.location.href = '/')}
          >
            <img
              src="/Profile.png"
              alt="Avatar"
              className="h-full w-full scale-[1.8] object-contain rounded-full"
            />
          </div>
        </div>
      );
    }),
  { ssr: false }
);

const MOTION_CONFIG = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: 0.15,
  },
};

const Chat = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query');
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isTalking, setIsTalking] = useState(false);

  // AI SDK v5 has a completely new API!
  // By default, it uses /api/chat endpoint
  const chatHook = useChat({
    // CRITICAL: Throttle UI updates to prevent freezing during streaming
    // This batches updates every 50ms instead of on every chunk
    experimental_throttle: 50, // Recommended value from AI SDK docs
    onFinish: (message) => {
      console.log('Message finished:', message);
    },
    onError: (error) => {
      console.error('Chat error:', error);
    },
  });

  // Map new AI SDK v5 API to old variables
  const messages = chatHook.messages || [];
  const stop = chatHook.stop || (() => {});
  const setMessages = chatHook.setMessages || (() => {});
  // addToolResult signature changed in v5, but it's not used in this app
  // Just pass undefined to components that accept it
  const addToolResult = undefined;
  
  // New v5 API uses 'status' instead of 'isLoading'
  // Valid statuses: 'submitted' | 'streaming' | 'ready' | 'error'
  const isLoading = chatHook.status === 'submitted' || chatHook.status === 'streaming';
  
  // New v5 API uses 'sendMessage' instead of 'append'
  const append = (message: any) => {
    if (chatHook.sendMessage) {
      // Extract content - handle both string and object
      const content = typeof message === 'string' ? message : (message.content || '');
      // AI SDK v5: sendMessage expects a message object with 'text' property
      chatHook.sendMessage({
        text: content
      });
    }
  };
  
  // New v5 API uses 'regenerate' instead of 'reload'
  // Wrap it to match the old signature
  const reload = async (options?: any) => {
    if (chatHook.regenerate) {
      await chatHook.regenerate(options);
    }
    return null;
  };
  
  // Manual input state management since v5 doesn't provide it
  const [input, setInputState] = useState('');
  
  const setInput = (value: string) => {
    setInputState(value);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && chatHook.sendMessage) {
      // AI SDK v5: sendMessage expects a message object with 'text' property
      chatHook.sendMessage({
        text: input.trim()
      });
      setInputState('');
    }
  };
  
  // Monitor status changes for video/talking state
  useEffect(() => {
    const status = chatHook.status;
    if (status === 'streaming' || status === 'submitted') {
      setLoadingSubmit(false);
      setIsTalking(true);
      if (videoRef.current) {
        videoRef.current.play().catch((error) => {
          console.error('Failed to play video:', error);
        });
      }
    } else if (status === 'ready') {
      setLoadingSubmit(false);
      setIsTalking(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [chatHook.status]);
  
  // Handle errors
  useEffect(() => {
    if (chatHook.error) {
      setLoadingSubmit(false);
      setIsTalking(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
      console.error('Chat error:', chatHook.error);
      toast.error(`Error: ${chatHook.error.message || 'Unknown error'}`);
    }
  }, [chatHook.error]);

  const { currentAIMessage, latestUserMessage, hasActiveTool } = useMemo(() => {
    const latestUserMessageIndex = messages.findLastIndex(
      (m) => m.role === 'user'
    );

    // Find the FIRST assistant message with a completed tool (not the latest!)
    // This ensures we display tools from earlier messages even if newer streaming messages exist
    let aiMessageWithTool = null;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'assistant') {
        const hasTool = messages[i].parts?.some(
          (part: any) =>
            typeof part.type === 'string' &&
            part.type.startsWith('tool-') &&
            part.state === 'output-available'
        );
        if (hasTool) {
          aiMessageWithTool = messages[i];
          break; // Found it! Use this one
        }
      }
    }

    // Fallback: if no message with tools, use the latest assistant message
    const latestAIMessageIndex = messages.findLastIndex(
      (m) => m.role === 'assistant'
    );
    const fallbackAIMessage = latestAIMessageIndex !== -1 ? messages[latestAIMessageIndex] : null;

    const result = {
      currentAIMessage: aiMessageWithTool || fallbackAIMessage,
      latestUserMessage:
        latestUserMessageIndex !== -1 ? messages[latestUserMessageIndex] : null,
      hasActiveTool: !!aiMessageWithTool,
    };

    // Hide AI message if latest user message is newer
    if (latestAIMessageIndex < latestUserMessageIndex) {
      result.currentAIMessage = null;
      result.hasActiveTool = false;
    }

    return result;
  }, [messages.length, messages[messages.length - 1]?.id, messages[messages.length - 1]?.parts]);

  const isToolInProgress = messages.some(
    (m) =>
      m.role === 'assistant' &&
      m.parts?.some(
        (part: any) =>
          (part.type === 'tool-invocation' && part.toolInvocation?.state !== 'result') ||
          (typeof part.type === 'string' && part.type.startsWith('tool-') && part.state !== 'output-available' && part.state !== 'output-error')
      )
  );

  //@ts-ignore
  const submitQuery = (query) => {
    if (!query.trim() || isToolInProgress) return;
    setLoadingSubmit(true);
    // AI SDK v5: sendMessage expects an object with 'text' property
    if (chatHook.sendMessage) {
      chatHook.sendMessage({
        text: query.trim(),
      });
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = true;
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.pause();
    }

    if (initialQuery && !autoSubmitted) {
      setAutoSubmitted(true);
      // Don't clear input, just submit the query
      submitQuery(initialQuery);
    }
  }, [initialQuery, autoSubmitted]);

  useEffect(() => {
    if (videoRef.current) {
      if (isTalking) {
        videoRef.current.play().catch((error) => {
          console.error('Failed to play video:', error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isTalking]);

  //@ts-ignore
  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isToolInProgress) return;
    // Use handleSubmit which already clears input
    if (chatHook.sendMessage) {
      // AI SDK v5: sendMessage expects a message object with 'text' property
      chatHook.sendMessage({
        text: input.trim()
      });
      setInputState('');
    }
  };

  const handleStop = () => {
    stop();
    setLoadingSubmit(false);
    setIsTalking(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Check if this is the initial empty state (no messages)
  const isEmptyState =
    !currentAIMessage && !latestUserMessage && !loadingSubmit;

  // Use consistent header height to prevent layout shift/flickering
  const headerHeight = 140;

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute top-6 right-8 z-51 flex flex-col-reverse items-center justify-center gap-1 md:flex-row">
        <WelcomeModal
          trigger={
            <div className="hover:bg-accent cursor-pointer rounded-2xl px-3 py-1.5">
              <Info className="text-accent-foreground h-8" />
            </div>
          }
        />
        <div className="">
          <ContactIcons 
            iconSize="sm"
            githubUrl="https://github.com/yash1thredddy"
            linkedinUrl="https://www.linkedin.com/in/yash1th26/"
            email="yashwanth2632@gmail.com"
            phone="+1 (312)-646-8975"
          />
        </div>
      </div>

      {/* Fixed Avatar Header with Gradient */}
      <div
        className="fixed top-0 right-0 left-0 z-50 bg-gradient-to-b from-white via-white/95 via-50% to-transparent dark:from-black dark:via-black/95 dark:via-50% dark:to-transparent"
      >
        <div className="py-6">
          <div className="flex justify-center">
            <ClientOnly>
              <Avatar
                hasActiveTool={hasActiveTool}
                videoRef={videoRef}
                isTalking={isTalking}
              />
            </ClientOnly>
          </div>

          <AnimatePresence>
            {latestUserMessage && !currentAIMessage && (
              <motion.div
                {...MOTION_CONFIG}
                className="mx-auto flex max-w-3xl px-4"
              >
                <ChatBubble variant="sent">
                  <ChatBubbleMessage>
                    <ChatMessageContent
                      message={latestUserMessage}
                      isLast={true}
                      isLoading={false}
                      reload={() => Promise.resolve(null)}
                    />
                  </ChatBubbleMessage>
                </ChatBubble>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto flex h-full max-w-4xl flex-col">
        {/* Scrollable Chat Content */}
        <div
          className="flex-1 overflow-y-auto px-2"
          style={{ paddingTop: `${headerHeight}px` }}
        >
          <AnimatePresence>
            {isEmptyState ? (
              <motion.div
                key="landing"
                className="flex min-h-full items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChatLanding submitQuery={submitQuery} />
              </motion.div>
            ) : currentAIMessage ? (
              <motion.div
                key={currentAIMessage.id || 'ai-message'}
                className="pb-24 md:pb-32"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SimplifiedChatView
                  message={currentAIMessage}
                  isLoading={isLoading}
                  reload={reload}
                  addToolResult={addToolResult}
                />
              </motion.div>
            ) : (
              loadingSubmit && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pt-18"
                >
                  <ChatBubble variant="received">
                    <ChatBubbleMessage isLoading />
                  </ChatBubble>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

{/* Fixed Bottom Bar */}
<div
  className="sticky bottom-0 px-2 pt-3 md:px-0 md:pb-4 transition-colors duration-300 bg-white dark:bg-black"
>
  <div className="relative flex flex-col items-center gap-3">
    <HelperBoost submitQuery={submitQuery} setInput={setInput} />
    <ChatBottombar
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={onSubmit}
      isLoading={isLoading}
      stop={handleStop}
      isToolInProgress={isToolInProgress}
    />
  </div>
</div>

        <a
          href="https://www.linkedin.com/in/yash1th26/"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed right-3 bottom-0 z-10 mb-4 hidden cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm hover:underline md:block"
        >
          @yash1th26
        </a>
      </div>
    </div>
  );
};

export default Chat;
