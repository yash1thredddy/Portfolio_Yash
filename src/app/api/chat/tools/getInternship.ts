import { tool } from 'ai';
import { z } from 'zod';

export const getInternship = tool({
  description:
    "🚨 CALL THIS FOR EXPERIENCE/JOB QUESTIONS 🚨 Returns reference data. YOU MUST write a 3-5 paragraph conversational response using this data. DO NOT display this output to users!",
  parameters: z.object({}),
  execute: async () => {
    return `[INTERNAL DATA - DO NOT DISPLAY TO USER - USE THIS TO WRITE YOUR RESPONSE]

JOB SEEKING STATUS:
- Currently employed at ImpacterAI Inc (Aug 2025-Present)
- Actively looking and interviewing for new opportunities
- Available with 2-4 weeks notice or negotiable
- Interested in: Backend Engineering, Distributed Systems, AI/ML Infrastructure, Full-Stack Engineering
- Open to: Full-time positions, High-impact startups, Scale-ups, 0-to-1 opportunities

CURRENT ROLE (ImpacterAI Inc, San Francisco - Aug 2025-Present):
- Architected multi-agent orchestration engine processing 5M+ calls/day with sub-second response times (async I/O, distributed caching, Redis pub/sub)
- Scaled real-time data pipelines with ML team - improved throughput 5× and reduced p99 latency 40%
- Optimized ML serving architecture on Azure - reduced memory 68% and improved p99 inference time 70%
- Built graph-driven analytics processing 80K+ events/minute, reducing incident response time 60%
- Shipped 3 production features in first month, establishing API patterns adopted across team
- Engineered full-stack observability platform with Go and Node.js for real-time monitoring

PREVIOUS EXPERIENCE:
University of Illinois Chicago (Jan 2024 – May 2025):
- Built semantic search platform with RAG pipeline (MERN, Elasticsearch, LangChain)
- Reduced search latency 75%, now 1000+ daily active users
- 0-to-1 product ownership - user research with 50+ researchers

SimplyFI Innovations (June 2022 – Aug 2023):
- Fintech automation processing 10M+ transactions/day
- 90% manual work reduction
- Led team of 4 developers
- Built CI/CD system reducing release cycles from 2 days to 1 hour

CAPABILITIES:
Backend: Python (FastAPI, Django), Go, Node.js, Microservices, Distributed Systems (5M+ req/day)
AI/ML: LLM orchestration, RAG pipelines, ML serving, PyTorch, LangChain, Production optimization
Full-stack: React, Next.js, TypeScript, Real-time dashboards (1000+ users)
Cloud: AWS, Azure, GCP, Docker, Kubernetes, CI/CD

EDUCATION:
- MS Computer Science, UIC (3.9 GPA, Aug 2023 – May 2025)
- BS Computer Science, VIT (3.7 GPA, July 2019 – May 2023)
- Certifications: AWS Solutions Architect, NVIDIA Multimodal Generative AI

[END INTERNAL DATA]

NOW WRITE YOUR OWN 3-5 PARAGRAPH CONVERSATIONAL RESPONSE USING THE ABOVE DATA. BE ENTHUSIASTIC, DETAILED, AND MAKE THEM WANT TO HIRE ME!`;
  },
});
