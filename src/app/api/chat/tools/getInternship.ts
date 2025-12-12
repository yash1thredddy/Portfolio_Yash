import { tool } from 'ai';
import { z } from 'zod';

export const getInternship = tool({
  description:
    "🚨 CALL THIS FOR EXPERIENCE/JOB QUESTIONS 🚨 Returns reference data. YOU MUST write a 3-5 paragraph conversational response using this data. DO NOT display this output to users!",
  parameters: z.object({}),
  execute: async () => {
    return `[INTERNAL DATA - DO NOT DISPLAY TO USER - USE THIS TO WRITE YOUR RESPONSE]

JOB SEEKING STATUS:
- Completed internship at ImpacterAI Inc (Aug 2025 - Nov 2025)
- Graduated with Master's in Computer Science from UIC (May 2025, CGPA: 3.9/4.0)
- Actively looking and interviewing for Software Engineering roles - AVAILABLE IMMEDIATELY!
- Target Roles: Software Engineer (Backend), Software Development Engineer (SDE), Distributed Systems Engineer
- Focus Areas: Backend systems development, distributed systems, real-time data pipelines, AI-powered applications
- Company Preferences: Big Tech (FAANG+), High-growth startups, Mid-size tech companies with complex engineering problems

RECENT INTERNSHIP - ImpacterAI Inc, Software Engineer Intern (San Francisco, Aug 2025 - Nov 2025):

Backend & LLM Orchestration:
- Developed FastAPI backend for multi-agent LLM orchestration, implementing async task routing, shared memory layer, and self-refining 'Judge' loops
- Reduced redundant API calls by ~30% and increased workflow throughput by ~5×
- Architected multi-agent orchestration engine processing 5M+ calls/day with sub-second response times
- Implemented async I/O, distributed caching, Redis pub/sub for real-time AI at massive scale

Data Pipelines & ML Optimization:
- Designed high-throughput data pipeline using Kafka + Go/Python processing tens of millions of events monthly
- Enabled real-time classification and anomaly detection
- Scaled real-time data pipelines with ML team - improved throughput 5× and reduced p99 latency 40%
- Migrated production inference to vLLM, optimizing KV cache utilization via PagedAttention
- Improved GPU utilization by ~40% while maintaining low Time-To-First-Token (TTFT) for enterprise clients
- Optimized ML serving architecture on Azure - reduced memory 68% and improved p99 inference time 70%

Full-Stack & Observability:
- Built real-time observability console (React + Next.js + WebSockets) visualizing 80K+/min inference logs
- Reduced MTTR by 60% through live debugging capabilities
- Built graph-driven analytics processing 80K+ events/minute, reducing incident response time 60%
- Engineered full-stack observability platform with Go and Node.js for real-time monitoring
- Shipped 3 production features in first month, establishing API patterns adopted across team

CURRENT EXPERIENCE - UICenter, University of Illinois Chicago, Software Engineer (Jan 2024 - Present):

Event Processing & Data Pipelines:
- Engineered high-throughput event ingestion service (Spring Boot + Kafka) using idempotent consumers and DLQs
- Ensures zero-loss processing for 5M+ daily research events
- Designed and implemented semantic search and retrieval pipeline using Elasticsearch and vector embeddings
- Achieved ~150ms median latency, replacing multi-hour manual lookups for 1,000+ researchers
- Built semantic search platform with RAG pipeline (MERN, Elasticsearch, LangChain)
- Reduced search latency 75%, now serving 1000+ daily active users
- Complete 0-to-1 product ownership - conducted user research with 50+ researchers

Performance & GPU Optimization:
- Accelerated compute workflows 3× (6h → 2h) by offloading matrix multiplications to A100 GPUs
- Custom CUDA kernels optimized via shared-memory tiling
- Performance optimization focus on high-throughput data processing

Backend Services & Infrastructure:
- Developed cloud-native resilient REST/gRPC microservices using Resilience4j circuit breakers and Redis caching
- Prevents cascading failures during peak ingestion loads
- Developed internal npm libraries and shared UI/service utilities
- Standardized workflows across 10+ research tools, reducing duplicated logic and accelerating feature delivery

PREVIOUS EXPERIENCE - SimplyFI Innovations, Software Engineer 1 (India, Jan 2023 - Aug 2023):

Backend & API Development:
- Built backend services for trade-finance platform processing $25M+ daily volume
- Developed Django REST APIs and NLP-driven automation pipelines achieving ~98% verification accuracy
- Fintech automation processing 10M+ transactions/day
- Reduced manual work by 90% through automation

Microservices & Architecture:
- Refactored and decomposed legacy monolith into 16+ microservices (Docker + Kubernetes) with Kafka event workflows
- Reduced system latency by ~35% and improved UI responsiveness
- Led team of 4 developers
- Built CI/CD automation system reducing release cycles from 2 days to 1 hour across 16 microservices

Testing & Quality:
- Implemented comprehensive test suites (unit, integration, E2E) across 25+ microservices using PyTest and JUnit
- Achieved 85%+ code coverage and improved deployment stability

Security & Operations:
- Implemented OAuth2/RBAC workflows to enforce Zero Trust security policies
- Improved traceability and reduced incident investigation time from 45min → 15min

KEY ACHIEVEMENTS & CAPABILITIES:

SOFTWARE ENGINEERING STRENGTHS (SDE-Focused):

1. Backend Development & Microservices (Core Expertise):
   - Frameworks: Spring Boot, FastAPI, Django - built production services handling 5M+ req/day
   - API Design: REST, gRPC - designed scalable APIs with versioning, documentation
   - Microservices: Event-driven architecture, Kafka workflows, service decomposition
   - Databases: PostgreSQL, MongoDB, Cassandra, DynamoDB, Redis, Elasticsearch, RocksDB
   - Data Pipelines: Semantic search platforms, distributed data pipelines, zero-loss event processing

2. Full-Stack Development (Strong):
   - Frontend: React, Next.js, TypeScript - built interactive dashboards serving 1000+ users
   - Real-time Systems: WebSockets, WebRTC - live observability consoles (80K+ events/min)
   - Visualization: D3.js for data visualization, interactive charts
   - Internal Tooling: Developed npm libraries and shared UI/service utilities across 10+ tools
   - End-to-end Ownership: From database schema to UI, shipping complete features

3. Distributed Systems & Performance:
   - Distributed Protocols: Raft consensus implementation, leader election, log replication
   - Event-Driven: Kafka producers/consumers, stream processing, pub/sub patterns
   - Fault Tolerance: Circuit breakers (Resilience4j), DLQs, graceful degradation, retries
   - Scale: 5M+ events/day with zero data loss, sub-150ms latency
   - Performance Optimization: 3× workflow speedup, 35-40% latency reductions

4. AI-Powered Applications:
   - LLM Systems: Multi-agent orchestration, async task routing, self-refining loops
   - Semantic Search: RAG pipelines with Elasticsearch and vector embeddings (1000+ daily users)
   - ML Optimization: vLLM with PagedAttention, 40% GPU utilization improvement
   - Vector Search: HNSW-based ANN engines, Product Quantization (4× memory reduction on 10M+ vectors)

5. Systems Programming & Performance:
   - Go: High-performance backends, concurrent systems, distributed protocols
   - C++: SIMD optimization (AVX2), Pybind11 bindings
   - CUDA: Custom kernels for ML acceleration, shared-memory tiling optimizations
   - Java: Enterprise-grade microservices, Spring Boot applications

6. Software Engineering Practices:
   - Testing: 85%+ code coverage (unit, integration, E2E with PyTest, JUnit)
   - CI/CD: Automated pipelines, deployment strategies, rollback mechanisms
   - Debugging: Production incident response, performance profiling, MTTR reduction (60%)
   - Code Quality: Code reviews, refactoring, technical debt management
   - Collaboration: Led team of 4, cross-functional work with ML/DevOps/Product teams

Impact Metrics:
- Processed 5M+ events daily with zero-loss guarantees
- Reduced latency by 35-75% across multiple systems
- Improved GPU utilization by 40%, throughput by 5×
- Cut MTTR by 60%, accelerated workflows 3×
- Achieved ~98% accuracy in NLP automation
- Scaled to $25M+ daily transaction volume

EDUCATION:
- Master of Science in Computer Science, University of Illinois Chicago (CGPA: 3.9/4.0, Aug 2023 – May 2025)
- Bachelor of Science in Computer Science, VIT (CGPA: 3.7/4.0, Jul 2019 – May 2023)
- AWS Solutions Architect – Associate Certified (2024)
- NVIDIA-Certified Associate: Multimodal Generative AI
- Relevant Coursework: Operating Systems, Database Systems, Distributed Systems, Computer Networks, Compiler Design, ML, Optimization

[END INTERNAL DATA]

NOW WRITE YOUR OWN 3-5 PARAGRAPH CONVERSATIONAL RESPONSE USING THE ABOVE DATA. BE ENTHUSIASTIC, DETAILED, AND MAKE THEM WANT TO HIRE ME!`;
  },
});
