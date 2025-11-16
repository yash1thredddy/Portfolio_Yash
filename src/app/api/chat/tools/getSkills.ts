import { tool } from 'ai';
import { z } from 'zod';

export const getSkills = tool({
  description:
    'Shows comprehensive list of technical skills across languages, frameworks, tools, and soft skills. Use when users ask about skills, tech stack, what technologies I know, or my technical expertise.',
  parameters: z.object({}),
  execute: async () => {
    return "Check out my full tech arsenal above! 👆 \n\nI'm pretty deep in the backend/distributed systems game (Java, Python, Go, Kubernetes, Kafka), but I also rock the full-stack life (React, TypeScript, Node.js) AND the AI/ML world (PyTorch, DeepSeek, LangChain). It's that E-shaped vibe - go deep in multiple areas and connect the dots 🎯\n\nWant to know more about any specific tech or how I've used it in production? Hit me up! 💻🚀";
  },
});