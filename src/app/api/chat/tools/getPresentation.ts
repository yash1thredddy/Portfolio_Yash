import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'Shows a personal introduction and overview of Yashwanth. Use when users ask "Who are you?", "Tell me about yourself", "What do you do?", or want a general introduction.',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation:
        "Check out the card above for the full scoop on who I am! 👆 \n\nQuick version: I'm an E-shaped engineer crushing it at ImpacterAI, building distributed systems that handle millions of requests daily. Got deep expertise in backend architecture, distributed systems, AI/ML infrastructure, AND full-stack dev. Yeah, I like to keep things interesting 😎🚀",
    };
  },
});