// src/components/chat/tool-renderer.tsx
'use client';
import { Contact } from '../contact';
import Crazy from '../crazy';
import InternshipCard from '../InternshipCard';
import { Presentation } from '../presentation';
import Resume from '../resume';
import Skills from '../skills';
import Sports from '../sport';
import AllProjects from '../projects/AllProjects';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Suspense, lazy, memo } from 'react';

// Memoized wrapper to prevent unnecessary re-renders
const MemoizedAllProjects = memo(AllProjects);
const MemoizedSkills = memo(Skills);

// Loading skeleton for projects
const ProjectsLoadingSkeleton = () => (
  <div className="w-full h-full pt-8 animate-pulse">
    <div className="max-w-7xl mx-auto mb-8">
      <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-48 mb-4"></div>
    </div>
    <div className="flex gap-4 overflow-hidden px-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex-shrink-0 w-56 h-80 bg-neutral-200 dark:bg-neutral-800 rounded-3xl"
        ></div>
      ))}
    </div>
  </div>
);

// Loading skeleton for skills
const SkillsLoadingSkeleton = () => (
  <div className="w-full animate-pulse">
    <div className="rounded-xl border bg-card p-6">
      <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-32 mb-4"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-40"></div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="h-6 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

interface ToolRendererProps {
  toolInvocations: any[];
  messageId: string;
}

export default function ToolRenderer({
  toolInvocations,
  messageId,
}: ToolRendererProps) {
  console.log('ToolRenderer - toolInvocations:', toolInvocations);
  
  if (!toolInvocations || toolInvocations.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {toolInvocations.map((tool) => {
        const { toolCallId, toolName } = tool;
        console.log('Rendering tool:', toolName, 'with ID:', toolCallId);

        // Return specialized components based on tool name
        switch (toolName) {
          case 'getProjects':
            return (
              <div
                key={toolCallId}
                className="w-full overflow-hidden rounded-lg"
              >
                <MemoizedAllProjects />
              </div>
            );

          case 'getPresentation':
            return (
              <div
                key={toolCallId}
                className="w-full overflow-hidden rounded-lg"
              >
                <Presentation />
              </div>
            );

          case 'getResume':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <Resume />
              </div>
            );

          case 'getContact':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <Contact />
              </div>
            );

          case 'getSkills':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <MemoizedSkills />
              </div>
            );

          case 'getSports':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <Sports />
              </div>
            );

          case 'getCrazy':
            return (
              <div key={toolCallId} className="w-full rounded-lg">
                <Crazy />
              </div>
            );

          // getInternship is internal data only - AI uses it to write response, don't display
          case 'getInternship':
            return null; // Don't render anything - AI will use this data to craft its response

          // Default renderer for other tools
          default:
            return (
              <div
                key={toolCallId}
                className="w-full rounded-lg"
              >
                <div className="prose dark:prose-invert max-w-none">
                  {typeof tool.result === 'object' ? (
                    <pre className="bg-secondary/20 overflow-x-auto rounded p-3 text-sm">
                      {JSON.stringify(tool.result, null, 2)}
                    </pre>
                  ) : (
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h2: ({ children }) => (
                          <h2 className="text-2xl font-bold mt-6 mb-4 dark:text-white">{children}</h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-semibold mt-4 mb-3 dark:text-white">{children}</h3>
                        ),
                        p: ({ children }) => (
                          <p className="mb-3 dark:text-gray-200">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc pl-6 mb-4 space-y-2 dark:text-gray-200">{children}</ul>
                        ),
                        li: ({ children }) => (
                          <li className="dark:text-gray-200">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-bold dark:text-white">{children}</strong>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline dark:text-blue-400"
                          >
                            {children}
                          </a>
                        ),
                        hr: () => (
                          <hr className="my-6 border-gray-300 dark:border-gray-700" />
                        ),
                      }}
                    >
                      {String(tool.result)}
                    </Markdown>
                  )}
                </div>
              </div>
            );
        }
      })}
    </div>
  );
}
