
import { tool } from "ai";
import { jsonSchema } from "@ai-sdk/provider-utils";


export const getProjects = tool({
  description:
    "Shows all projects by Yashwanth spanning Distributed Systems, Backend, Full-Stack, and AI/ML. Use when users ask about projects, side projects, what I've built, portfolio, or technical work.",
  inputSchema: jsonSchema({ type: "object", properties: {} }),
  execute: async () => {
    return `[INTERNAL DATA - DO NOT DISPLAY TO USER - USE THIS TO WRITE YOUR RESPONSE]

FEATURED PROJECTS (8 Total):

1. Real-Time AI Bias Mitigation (December 2024)
   Tech: Python, DeepSeek, React, WebRTC, PyTorch, FastAPI, Adversarial Debiasing

   The Problem: LLMs exhibit demographic biases and are vulnerable to jailbreak attacks, but traditional post-training approaches require expensive retraining and don't adapt at inference time.

   The Solution: Built an LLM-as-Judge framework with a Fairness Mediator that performs real-time bias correction during inference—no model retraining needed.

   Impact & Scale:
   - Achieved +66.7% Bias Safety Score improvement on Mistral-7B
   - 0.87 human evaluation agreement (Cohen's Kappa) validating effectiveness
   - Halved 7 types of jailbreak attacks (prompt injection, role-playing, etc.)
   - Real-time WebRTC playground demonstrating live bias correction
   - Adversarial debiasing pipeline that works with any LLM architecture

   Why This Matters: Makes AI safer and fairer without costly retraining—critical for responsible AI deployment at scale.
   Links: Research Paper available

2. LLM Optimization Pipeline (November 2024)
   Tech: Python, PyTorch, FastAPI, React, QLoRA, Model Pruning, Quantization, Hugging Face

   The Problem: Running LLMs in production is expensive—high memory, slow inference, and massive energy costs make deployment prohibitive for many use cases.

   The Solution: Engineered a multi-stage optimization pipeline combining Instant Soup Pruning with QLoRA fine-tuning to make models 30% smaller, 32% faster, and 55% more memory-efficient.

   Impact & Scale:
   - Reduced model parameters by 30% while improving perplexity by 65% (Gemma-3-1B & Mistral)
   - 32% faster inference + 55% memory reduction = fits on smaller GPUs
   - Slashed PEFT training time by 77% (hours → minutes)
   - Cut energy usage by 32%—making AI greener and cheaper
   - Interactive React/FastAPI demo visualizing optimization trade-offs in real-time

   Why This Matters: Democratizes LLM deployment by making powerful models runnable on consumer hardware—critical for edge AI and sustainable ML.
   Links: Research Paper available

3. Distributed Consensus KV Store (October 2024)
   Tech: Go, gRPC, RocksDB, Raft Consensus, Prometheus, Grafana, React

   The Problem: Building distributed systems that stay consistent during network failures is notoriously hard—most developers never implement Raft from scratch.

   The Solution: Implemented a production-grade Raft consensus algorithm from the ground up in Go, handling leader election, log replication, and network partitions with linearizable consistency guarantees.

   Architecture & Scale:
   - Raft consensus protocol with 5-node cluster surviving network partitions
   - Linearizable consistency—clients always see the latest committed data
   - RocksDB LSM-tree backend with Write-Ahead Log (WAL) for crash recovery
   - gRPC for low-latency inter-node communication
   - Real-time observability dashboard (React + Prometheus/Grafana)
   - Visualizes replication lag, commit index, leader status, cluster health
   - Automatic failover: new leader elected in <2 seconds

   Why This Matters: Demonstrates deep understanding of distributed systems fundamentals—the backbone of every scalable backend (databases, message queues, etc.).

4. High-Performance Vector Search Engine (August 2024)
   Tech: C++, FastAPI, Python, SIMD (AVX2), HNSW, Product Quantization, Pybind11

   The Problem: Semantic search on millions of embeddings requires specialized infrastructure—vanilla nearest-neighbor search doesn't scale, and existing solutions are often black boxes.

   The Solution: Built a custom HNSW-based Approximate Nearest Neighbor (ANN) engine from scratch in C++, optimized with AVX2 SIMD instructions for blazing-fast vector operations.

   Performance & Scale:
   - Handles 10M+ high-dimensional vectors with sub-100ms query latency
   - AVX2 SIMD optimizations: 4-8× speedup on distance computations
   - Product Quantization (PQ): 4× memory reduction while maintaining high recall
   - C++ core exposed via Pybind11 → FastAPI for production serving
   - Concurrent query handling for real-time ML pipelines (RAG, recommendation systems)
   - Built for scale: powers semantic search over massive embedding datasets

   Why This Matters: Powers the next generation of AI applications—RAG systems, recommendation engines, and semantic search all rely on fast vector retrieval at scale.

5. DynamicFlow Scheduler (September 2024)
   Tech: Java, Spring Boot, RabbitMQ, Redis, PostgreSQL, Kubernetes, Prometheus, Grafana

   The Problem: Traditional task schedulers struggle with dynamic workloads—fixed partitioning leads to idle workers while others are overloaded.

   The Solution: Built a distributed, fault-tolerant task scheduler with work-stealing algorithm and intelligent load balancing, ensuring optimal resource utilization across all worker nodes.

   Impact & Scale:
   - 30% faster task processing through dynamic work stealing
   - 50% reduction in downtime via automatic failover and health checks
   - 35% improved system concurrency—keeps all workers busy
   - RabbitMQ for async job queuing with DLQ for failed tasks
   - Redis caching for frequently accessed task metadata
   - Kubernetes-ready: horizontal scaling with zero-downtime deployments
   - Real-time monitoring (Prometheus/Grafana) tracking queue depth, worker health

   Why This Matters: Critical infrastructure for any system processing background jobs—from ETL pipelines to ML training orchestration.

6. Multi-Agent Orchestration Engine (Ongoing - Aug 2025-Present at ImpacterAI)
   Tech: Python, FastAPI, Redis, Kubernetes, WebSockets, Async I/O, Azure

   The Problem: Coordinating multiple LLM agents for conversational AI at massive scale (5M+ calls/day) requires sophisticated orchestration—naive approaches lead to redundant API calls and poor latency.

   The Solution: Architected a production multi-agent system powering PersuadioAI's platform with async task routing, shared memory layer, and self-refining 'Judge' loops that validate responses before returning to users.

   Production Scale & Impact:
   - Powers 5M+ daily calls with sub-second response times
   - Self-refining Judge loops cut redundant API calls by 30% (millions saved)
   - Async I/O + Redis pub/sub for real-time agent coordination
   - Dynamic load balancing with circuit breakers → 99.9% uptime
   - Real-time observability processing 80K+ events/minute
   - WebSockets for streaming responses to frontend
   - Deployed on Azure with Kubernetes for elastic scaling

   Why This Matters: Production-grade multi-agent AI at scale—this is the infrastructure behind next-gen conversational platforms serving millions.

7. CrashLens - Traffic Analytics Platform (March 2024)
   Tech: Python, React, TypeScript, AWS, PostgreSQL, D3.js, WebRTC, Mapbox

   The Problem: Traffic safety analysts spend hours manually sifting through crash data to identify dangerous intersections—slow, manual, and reactive.

   The Solution: Built a full-stack analytics platform with predictive modeling and interactive visualizations that automatically identifies crash patterns and high-risk zones.

   Impact & Features:
   - Analyzes historical SQL traffic data with predictive analytics
   - Reduces potential crash rates by 26% through proactive intervention
   - Interactive D3.js visualizations + Mapbox heat maps for spatial analysis
   - CRUD operations for managing traffic data, filters, and custom reports
   - WebRTC for real-time collaboration between traffic engineers
   - AWS deployment with PostgreSQL backend for scalable data storage

   Why This Matters: Data-driven approach to public safety—proactively preventing accidents instead of reacting to them.

8. AI-Native Portfolio (January 2025)
   Tech: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, DeepSeek API, Node.js

   The Problem: Traditional portfolios are static PDFs or boring websites—recruiters can't interact or ask questions about specific experience.

   The Solution: Built an AI-powered conversational portfolio where you can literally chat with my experience, projects, and skills in real-time.

   Features & Performance:
   - Interactive AI chat interface powered by DeepSeek API
   - Real-time streaming responses with tool-calling architecture
   - LRU caching reducing API calls by 60-90% (smart cost optimization)
   - Custom cursor effects, smooth Framer Motion animations, dark mode
   - Tool-based architecture: 9 specialized tools for experience, projects, skills, contact
   - You're experiencing it right now—ask me anything!

   Why This Matters: Demonstrates full-stack + AI integration skills while providing an unforgettable user experience. This IS the portfolio.

TECHNICAL THEMES ACROSS PROJECTS:
- Distributed Systems: Raft consensus, fault tolerance, high availability
- AI/ML: LLM optimization, bias mitigation, multi-agent orchestration, vector search
- Performance: SIMD optimization, caching, pruning, quantization (30-77% improvements)
- Scale: 5M+ events/day, millions of vectors, real-time processing
- Full-stack: React frontends, FastAPI/Spring backends, real-time dashboards
- Production-grade: Monitoring, observability, 99.9% uptime, zero-loss guarantees

[END INTERNAL DATA]

NOW WRITE A DETAILED, ENTHUSIASTIC 3-5 PARAGRAPH RESPONSE ABOUT THESE PROJECTS. Highlight the technical depth, scale, and impact. Make it conversational and exciting!`;
  },
});
