import { tool } from 'ai';
import { z } from 'zod';

export const getContact = tool({
  description:
    'Shows contact information including email, phone, location, LinkedIn, and GitHub. Use this when users ask how to contact me, reach out, connect, or get in touch.',
  parameters: z.object({}),
  execute: async () => {
    return "Here are all the ways to reach me! I'm always excited to connect with fellow engineers, discuss opportunities in distributed systems and AI/ML, or just chat about building scalable products. Looking forward to hearing from you! 🚀";
  },
});
