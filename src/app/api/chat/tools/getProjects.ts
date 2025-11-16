
import { tool } from "ai";
import { z } from "zod";


export const getProjects = tool({
  description:
    "Shows all projects by Yashwanth spanning Distributed Systems, Backend, Full-Stack, and AI/ML. Use when users ask about projects, side projects, what I've built, portfolio, or technical work.",
  parameters: z.object({}),
  execute: async () => {
    return "Check out the projects above! 👆 I've built some pretty cool stuff - from real-time AI bias mitigation systems to LLM optimization pipelines to distributed task schedulers. Each one taught me something new about building systems that actually work at scale 🚀\n\nWant me to dive deep into any of these? I can geek out about the architecture, the challenges, the wins - whatever you're curious about! 🎯";
  },
});