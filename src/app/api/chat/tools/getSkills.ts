import { tool } from 'ai';
import { z } from 'zod';

export const getSkills = tool({
  description:
    'Shows comprehensive list of technical skills across languages, frameworks, tools, and soft skills. Use when users ask about skills, tech stack, what technologies I know, or my technical expertise.',
  parameters: z.object({}),
  execute: async () => {
    return `[INTERNAL DATA - DO NOT DISPLAY TO USER - USE THIS TO WRITE YOUR RESPONSE]

TECHNICAL SKILLS BREAKDOWN:

PROGRAMMING LANGUAGES (Production Experience):
- Python: FastAPI, Django, PyTorch, async/await, data pipelines, ML serving
- Go: gRPC services, concurrent systems, Raft consensus, high-performance backends
- Java: Spring Boot, microservices, event-driven architectures, enterprise systems
- C++: SIMD optimization (AVX2), CUDA kernels, Pybind11, high-performance computing
- SQL: PostgreSQL, MongoDB, DynamoDB, complex queries, schema design, optimization
- TypeScript/JavaScript: React, Next.js, Node.js, WebSockets, full-stack apps
- CUDA: Custom kernels, shared memory optimization, GPU acceleration

BACKEND & SYSTEMS (Core Strength):
- Frameworks: Spring Boot, FastAPI, Django, Node.js, Express
- Microservices: Event-driven architecture, API design, service mesh
- Message Queues: Kafka (producers, consumers, stream processing), RabbitMQ
- RPC: gRPC, Protocol Buffers, high-throughput communication
- Databases: PostgreSQL, MongoDB, Cassandra, DynamoDB, Redis, Elasticsearch, RocksDB
- Search & Data: Elasticsearch, Vector Search (HNSW), Embedding Pipelines
- Distributed Systems: Raft Consensus, Distributed KV stores, Fault tolerance, CAP theorem
- Big Data: Spark, Hadoop, large-scale data processing

AI & DATA SYSTEMS (Deep Experience):
- Frameworks: PyTorch, TensorFlow, Hugging Face Transformers
- LLM Stack: vLLM, DeepSpeed, LangChain, Multi-agent orchestration
- Optimization: Model pruning, Quantization (QLoRA), CUDA kernels, PagedAttention
- ML Serving: Production inference, GPU optimization, latency optimization
- Vector Search: HNSW algorithms, Product Quantization, SIMD optimization
- AI Safety: Bias mitigation, LLM-as-Judge, Adversarial debiasing
- Embedding Pipelines: Semantic search, RAG systems, real-time retrieval

CLOUD & DEVOPS (Production Grade):
- Cloud Platforms: AWS (EC2, S3, Lambda, SageMaker), GCP, Azure
- Containerization: Docker, Kubernetes, Helm, container orchestration
- CI/CD: Jenkins, GitHub Actions, GitLab CI, automated deployment pipelines
- Monitoring: Prometheus, Grafana, ELK stack, distributed tracing
- Load Balancing: NGINX, HAProxy, dynamic load balancing
- Infrastructure: Terraform, infrastructure as code, cloud-native architectures
- Version Control: Git, GitHub, GitLab, branching strategies

FRONTEND & FULL-STACK (Proficient):
- Modern Frontend: React.js, Next.js, TypeScript, Server-Side Rendering
- Real-time: WebSockets, WebRTC, real-time dashboards, live updates
- Visualization: D3.js, Charts.js, interactive data visualization
- State Management: Redux, Context API, state optimization
- Styling: Tailwind CSS, styled-components, responsive design
- Animation: Framer Motion, CSS animations, smooth UX
- Node.js: Express, backend services, REST APIs

TESTING & QUALITY (Best Practices):
- Unit Testing: PyTest (Python), JUnit (Java), Jest (JavaScript)
- Integration Testing: End-to-end workflows, API testing, contract testing
- E2E Testing: Selenium, Cypress, automated browser testing
- Code Coverage: 85%+ coverage achieved across 25+ microservices
- Performance Testing: Load testing, stress testing, benchmarking
- Test-Driven Development: TDD practices, continuous testing

SPECIALIZED SKILLS:
- Distributed Systems Design: Consensus algorithms, replication, fault tolerance
- Performance Optimization: Profiling, caching strategies, latency reduction (35-75%)
- Real-time Data: Stream processing, event-driven systems, sub-second latency
- System Design: Scalable architectures, 5M+ req/day handling, high availability
- API Design: REST, gRPC, WebSockets, versioning, documentation
- Security: OAuth2, RBAC, Zero Trust, secure coding practices
- Resilience Engineering: Circuit breakers (Resilience4j), DLQs, graceful degradation

SOFT SKILLS & METHODOLOGIES:
- System Thinking: End-to-end ownership, cross-functional collaboration
- Problem Solving: Complex debugging, performance tuning, architectural decisions
- Leadership: Led team of 4 developers, mentoring, code reviews
- Communication: Technical documentation, presentations, stakeholder management
- Agile/Scrum: Sprint planning, retrospectives, iterative development
- Research: Published research papers, academic rigor in industry settings

CERTIFICATIONS & CREDENTIALS:
- AWS Solutions Architect – Associate (2024)
- NVIDIA-Certified Associate: Multimodal Generative AI
- Academic: MS CS (3.9 GPA), BS CS (3.7 GPA)

KEY TECHNICAL ACHIEVEMENTS:
✅ Built systems handling 5M+ events/day with zero-loss guarantees
✅ Reduced latency by 35-75% across multiple production systems
✅ Improved GPU utilization by 40%, throughput by 5×
✅ Achieved 85%+ test coverage across 25+ microservices
✅ Processed $25M+ daily transaction volume
✅ Cut MTTR by 60%, accelerated workflows 3×
✅ Published 2 research papers on AI bias & LLM optimization

E-SHAPED ENGINEER PROFILE:
- DEEP in: Backend/Distributed Systems, AI/ML Infrastructure, Real-time Data
- BROAD in: Full-stack development, Cloud/DevOps, System Design
- CONNECTS: Business impact, team collaboration, end-to-end delivery

[END INTERNAL DATA]

NOW WRITE A DETAILED, ENTHUSIASTIC RESPONSE ABOUT THESE SKILLS. Emphasize the E-shaped profile - deep expertise in multiple areas. Make it conversational!`;
  },
});