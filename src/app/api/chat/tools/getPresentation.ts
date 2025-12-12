import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'Shows a personal introduction and overview of Yashwanth. Use when users ask "Who are you?", "Tell me about yourself", "What do you do?", or want a general introduction.',
  parameters: z.object({}),
  execute: async () => {
    return `[INTERNAL DATA - DO NOT DISPLAY TO USER - USE THIS TO WRITE YOUR RESPONSE]

PERSONAL INTRODUCTION:

WHO I AM:
Yashwanth Reddy Dasari (goes by Yash) - Software Engineer specializing in backend systems, real-time data pipelines, and AI-driven applications. E-shaped engineer with deep expertise in multiple technical domains.

CURRENT STATUS:
- Completed Master of Science in Computer Science at University of Illinois Chicago (CGPA: 3.9/4.0, Graduated May 2025)
- Recent Software Engineer Intern at ImpacterAI Inc, San Francisco (Aug 2025 - Nov 2025)
- Currently Software Engineer at UICenter, UIC (Jan 2024 - Present)
- Actively seeking Software Engineer (SDE) roles - available immediately for Big Tech, startups, or high-growth companies!

WHAT I DO:
- Build scalable microservices and multi-agent LLM systems for high-throughput production environments
- Design real-time data pipelines processing millions of events daily
- Architect distributed systems with fault tolerance and high availability
- Optimize AI/ML infrastructure for production deployment
- Deliver end-to-end features from research to production

TECHNICAL IDENTITY - E-SHAPED ENGINEER:
Deep Expertise (The Verticals):
1. Backend & Distributed Systems: Spring Boot, FastAPI, Kafka, gRPC, microservices handling 5M+ req/day
2. AI/ML Infrastructure: LLM orchestration, vLLM optimization, CUDA kernels, RAG pipelines
3. Real-time Data Pipelines: Event-driven architectures, stream processing, sub-second latency

Broad Knowledge (The Horizontal):
- Full-stack development (React, Next.js, TypeScript)
- Cloud & DevOps (AWS, GCP, Azure, Kubernetes, CI/CD)
- System design & architecture
- Performance optimization

Connection Skills:
- End-to-end product ownership (0-to-1 development)
- Cross-functional collaboration (worked with ML, DevOps, Product teams)
- Business impact focus (reduced costs by 54%, improved reliability by 60%)

CORE STRENGTHS:
✅ Production-grade systems: Built services handling $25M+ daily volume, 5M+ events/day
✅ Performance optimization: Achieved 35-75% latency reductions, 3-5× throughput improvements
✅ Scalability: Designed systems for millions of users with 99.9% uptime
✅ AI/ML expertise: Multi-agent orchestration, LLM optimization, CUDA acceleration
✅ Full-stack capability: End-to-end feature development, from backend to frontend
✅ Research mindset: Published papers on AI bias mitigation and LLM optimization

EDUCATION:
- Master of Science in Computer Science, University of Illinois Chicago
  CGPA: 3.9/4.0 | Aug 2023 – May 2025

- Bachelor of Science in Computer Science, Vellore Institute of Technology (VIT)
  CGPA: 3.7/4.0 | Jul 2019 – May 2023

- Relevant Coursework: Operating Systems, Database Systems, Distributed Systems, Computer Networks,
  Compiler Design, Design and Analysis of Algorithms, Machine Learning, Optimization Techniques,
  Neural Networks, Computer Architecture

CERTIFICATIONS:
- AWS Solutions Architect – Associate (2024)
- NVIDIA-Certified Associate: Multimodal Generative AI

LOCATION & AVAILABILITY:
- Based in: San Francisco Bay Area / Chicago
- Open to: Relocation, Remote, Hybrid
- Available: May 2025 (graduating) or earlier for exceptional opportunities
- Work Authorization: (Include if relevant)

WHAT DRIVES ME:
- Building systems that scale to millions while maintaining reliability
- The 0-to-1 journey - taking ideas from concept to production
- Performance optimization challenges - making things 2-5× faster
- The intersection of backend engineering and AI/ML infrastructure
- Solving gnarly distributed systems problems

PERSONALITY & WORK STYLE:
- Ownership mentality: End-to-end responsibility for features and systems
- Collaborative: Led team of 4, worked across ML/DevOps/Product teams
- Data-driven: Use metrics to guide decisions (achieved 85%+ test coverage)
- Impact-focused: Reduced MTTR by 60%, cut costs by 54%, improved throughput by 5×
- Continuous learner: Published research, earned certifications, exploring new tech

QUICK FACTS:
📍 Location: San Francisco, CA / Chicago, IL
🎓 Education: MS CS @ UIC (3.9 GPA), BS CS @ VIT (3.7 GPA)
💼 Experience: ImpacterAI (Intern), UICenter (SWE), SimplyFI (SWE1)
🔧 Tech: Python, Go, Java, C++, Kafka, Kubernetes, PyTorch, React
🏆 Impact: 5M+ events/day, 35-75% latency reduction, 99.9% uptime
📧 Contact: yashwanth2632@gmail.com
📞 Phone: +1 (312)-646-8975
🔗 LinkedIn: linkedin.com/in/yash1th26
💻 GitHub: github.com/yash1thredddy

[END INTERNAL DATA]

NOW WRITE A WARM, ENGAGING 3-4 PARAGRAPH INTRODUCTION. Make it personal, enthusiastic, and showcase the E-shaped engineer profile. Be conversational!`;
  },
});