// File: data.tsx

import Image from 'next/image';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// --- PROJECT DATABASE ---
// This array holds the detailed information for each project.
const PROJECT_CONTENT = [
    {
    // --- NEW AI-NATIVE PORTFOLIO PROJECT ---
    title: 'AI-Native Portfolio',
    description:
      'An interactive AI-powered portfolio that goes beyond static pages. Built with Next.js and DeepSeek AI, this portfolio features a conversational AI that answers questions about my experience, projects, and skills in real time.',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'DeepSeek API',
      'Node.js',
      'Vercel',
    ],
    date: 'January 2025',
    links: [
      {
        name: 'Live Demo - You Are Here!',
        url: '#',
      },
      {
        name: 'GitHub Repository',
        url: 'https://github.com/yash1thredddy/ai-native-portfolio',
      },
    ],
    images: [
      { src: '/projects/ai-portfolio-chat.png', alt: 'The AI Native Portfolio chat interface in action' },
      { src: '/projects/ai-portfolio-home.png', alt: 'Homepage of the AI Native Portfolio' },
    ],
  },
  {
    title: 'Real-Time AI Bias Mitigation',
    description:
      'Built a comprehensive Bias Mitigation & AI safety framework using LLM-as-Judge (DeepSeek) with an inference-time "Fairness Mediator". Developed a React/WebRTC playground demonstrating real-time bias correction via Adversarial Debiasing. Achieved +66.7% Bias Safety Score on Mistral-7B, 0.87 human-eval (Cohen\'s K), and halved 7 types of jailbreak attacks.',
    techStack: [
      'Python',
      'DeepSeek',
      'React',
      'WebRTC',
      'PyTorch',
      'FastAPI',
      'Adversarial Debiasing',
      'LLM Evaluation',
    ],
    date: 'December 2024',
    links: [
      {
        name: 'Research Paper',
        url: 'https://drive.google.com/file/d/15kDjaZO1lLPEto4Q3U3BM6eycbQa2-k5/view?usp=sharing',
      },
      {
        name: 'GitHub Repository',
        url: 'https://github.com/yash1thredddy',
      },
    ],
    images: [
      {
        src: '/projects/bias-mitigation.jpg',
        alt: 'AI Bias Mitigation Framework Overview',
      },
    ],
  },
  {
    title: 'LLM Optimization Pipeline',
    description:
      'Architected a comprehensive LLM Pruning (Instant Soup Pruning) + Quantization (QLORA) pipeline that reduces parameters by 30% and improves perplexity by 65%. Built a React/FastAPI demo UI visualizing 32% inference speed-up and 55% memory reduction on Gemma-3-1B & Mistral models. Reduced PEFT training time by 77% and cut energy usage by 32% for sustainable, cost-efficient model deployment.',
    techStack: [
      'Python',
      'PyTorch',
      'FastAPI',
      'React',
      'QLoRA',
      'Model Pruning',
      'Quantization',
      'Hugging Face',
    ],
    date: 'November 2024',
    links: [
      {
        name: 'Research Paper',
        url: 'https://drive.google.com/file/d/1yLWREajEbS5RnpwcuNPRNZmUfL3xwn5x/view?usp=sharing',
      },
      {
        name: 'GitHub Repository',
        url: 'https://github.com/yash1thredddy',
      },
    ],
    images: [
      { src: '/projects/llm-optimization.jpeg', alt: 'LLM Optimization Dashboard' },
    ],
  },
  {
    title: 'DynamicFlow Scheduler',
    description:
      'Built a distributed, fault-tolerant task scheduler using Java & Spring Boot that boosts task processing speed by 30% and cuts downtime by 50%. Implemented a work-stealing algorithm with RabbitMQ for asynchronous job queuing, enhancing system concurrency by 35%. Features intelligent load balancing, automatic failover, and real-time monitoring capabilities.',
    techStack: [
      'Java',
      'Spring Boot',
      'RabbitMQ',
      'Redis',
      'PostgreSQL',
      'Kubernetes',
      'Prometheus',
      'Grafana',
    ],
    date: 'September 2024',
    links: [
      {
        name: 'GitHub Repository',
        url: 'https://github.com/yash1thredddy',
      },
    ],
    images: [
      { src: '/projects/dynamicflow-scheduler.jpg', alt: 'DynamicFlow Scheduler Dashboard' },
    ],
  },
  {
    title: 'CrashLens',
    description:
      'Built a full-stack traffic analytics platform using Python, React, and TypeScript on AWS that analyzes SQL traffic data to identify crash patterns and reduce potential crash rates by 26%. Implemented interactive web visualization with CRUD functionalities, D3.js, WebRTC, and Mapbox for real-time data insights. Features predictive analytics, heat maps, and comprehensive reporting tools for traffic safety analysis.',
    techStack: [
      'Python',
      'React',
      'TypeScript',
      'AWS',
      'PostgreSQL',
      'D3.js',
      'WebRTC',
      'Mapbox',
    ],
    date: 'March 2024',
    links: [
      {
        name: 'Live Demo',
        url: '#',
      },
      {
        name: 'GitHub Repository',
        url: 'https://github.com/yash1thredddy/CrashLens-Insights-into-US-Traffic-Collisions',
      },
    ],
    images: [
      { src: '/projects/crashlens-preview.png', alt: 'CrashLens Dashboard with Traffic Analytics' },
    ],
  },
  {
    title: 'Multi-Agent Orchestration Engine',
    description:
      'At ImpacterAI (Aug 2025-Present), architecting a production-grade multi-agent orchestration engine powering PersuadioAI\'s conversational AI platform. Handles 5M+ daily calls with sub-second response times using Python, FastAPI, async I/O, Redis pub/sub, and distributed caching. Implemented dynamic load balancing, circuit breakers, and automatic failover mechanisms for 99.9% uptime.',
    techStack: [
      'Python',
      'FastAPI',
      'Redis',
      'Kubernetes',
      'WebSockets',
      'Async I/O',
      'Distributed Systems',
      'Azure',
    ],
    date: 'Ongoing',
    links: [],
    images: [
      {
        src: '/projects/multi-agent-orchestration.jpeg',
        alt: 'Multi-Agent Orchestration Architecture',
      },
    ],
  },
];

// --- COMPONENT & INTERFACE DEFINITIONS ---
// Define interface for project prop
interface ProjectProps {
  title: string;
}

// This component dynamically renders the project details
const ProjectContent = ({ project }: { project: ProjectProps }) => {
  // Find the matching project data from the database
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);

  if (!projectData) {
    return <div>Project details not available</div>;
  }

  return (
    <div className="space-y-10">
      {/* Header section with description */}
      <div className="rounded-3xl bg-[#F5F5F7] p-8 dark:bg-[#1D1D1F]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{projectData.date}</span>
          </div>

          <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
            {projectData.description}
          </p>

          {/* Tech stack */}
          <div className="pt-4">
            <h3 className="mb-3 text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links section */}
      {projectData.links && projectData.links.length > 0 && (
        <div className="mb-24">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Links
            </h3>
            <Link className="text-muted-foreground w-4" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {projectData.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#F5F5F7] flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-[#E5E5E7] dark:bg-neutral-800 dark:hover:bg-neutral-700"
              >
                <span className="font-light capitalize">{link.name}</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Images gallery */}
      {projectData.images && projectData.images.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {projectData.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-2xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN DATA EXPORT ---
// This is the data used by your main portfolio page.
export const data = [
   {
    category: 'Full-Stack & AI',
    title: 'AI-Native Portfolio',
    src: '/projects/ai-portfolio-preview.png',
    content: (
      <ProjectContent project={{ title: 'AI-Native Portfolio' }} />
    ),
  },
  {
    category: 'AI/ML & Research',
    title: 'Real-Time AI Bias Mitigation',
    src: '/projects/bias-mitigation.jpg',
    content: (
      <ProjectContent project={{ title: 'Real-Time AI Bias Mitigation' }} />
    ),
  },
  {
    category: 'AI/ML Optimization',
    title: 'LLM Optimization Pipeline',
    src: '/projects/llm-optimization.jpeg',
    content: (
      <ProjectContent project={{ title: 'LLM Optimization Pipeline' }} />
    ),
  },
  {
    category: 'Distributed Systems',
    title: 'DynamicFlow Scheduler',
    src: '/projects/dynamicflow-scheduler.jpg',
    content: (
      <ProjectContent project={{ title: 'DynamicFlow Scheduler' }} />
    ),
  },
  {
    category: 'Full-Stack Analytics',
    title: 'CrashLens',
    src: '/projects/crashlens-preview.png',
    content: (
      <ProjectContent project={{ title: 'CrashLens' }} />
    ),
  },
  {
    category: 'Backend & Distributed Systems',
    title: 'Multi-Agent Orchestration Engine',
    src: '/projects/multi-agent-orchestration.jpeg',
    content: (
      <ProjectContent project={{ title: 'Multi-Agent Orchestration Engine' }} />
    ),
  },
];