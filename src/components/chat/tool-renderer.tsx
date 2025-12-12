// src/components/chat/tool-renderer.tsx
import { Contact } from '../contact';
import Crazy from '../crazy';
import InternshipCard from '../InternshipCard';
import { Presentation } from '../presentation';
import AllProjects from '../projects/AllProjects';
import Resume from '../resume';
import Skills from '../skills';
import Sports from '../sport';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ToolRendererProps {
  toolInvocations: any[];
  messageId: string;
}

export default function ToolRenderer({
  toolInvocations,
  messageId,
}: ToolRendererProps) {
  return (
    <div className="w-full">
      {toolInvocations.map((tool) => {
        const { toolCallId, toolName } = tool;

        // Return specialized components based on tool name
        switch (toolName) {
          case 'getProjects':
            return (
              <div
                key={toolCallId}
                className="w-full overflow-hidden rounded-lg"
              >
                <AllProjects />
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
                <Skills />
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
