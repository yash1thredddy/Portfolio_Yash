import { tool } from 'ai';
import { jsonSchema } from '@ai-sdk/provider-utils';

export const getResume = tool({
  description:
    'This tool show my resume.',
  inputSchema: jsonSchema({ type: 'object', properties: {} }),
  execute: async () => {
    return "You can download my resume by clicking on the link above.";
  },
});
