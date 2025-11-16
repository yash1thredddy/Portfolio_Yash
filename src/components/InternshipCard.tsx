'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Code2, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

const InternshipCard = () => {
  const openMail = () => {
    window.open('mailto:yashwanth2632@gmail.com', '_blank');
  };
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-accent mx-auto mt-8 w-full max-w-4xl rounded-3xl px-6 py-8 font-sans sm:px-10 md:px-16 md:py-12"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar placeholder */}
          <div className="bg-muted h-16 w-16 overflow-hidden rounded-full shadow-md">
            <img
              src="/Profile.png"
              alt="Yashwanth's avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-foreground text-2xl font-semibold">
              Yashwanth Reddy
            </h2>
            <p className="text-muted-foreground text-sm">
              Software Engineer - E-Shaped
            </p>
          </div>
        </div>

        {/* Live badge */}
        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <span className="flex items-center gap-1 rounded-full border border-green-500 px-3 py-0.5 text-sm font-medium text-green-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Live
          </span>
        </div>
      </div>

      {/* Internship Info */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-1 h-5 w-5 text-blue-500" />
          <div>
            <p className="text-foreground text-sm font-medium">Availability</p>
            <p className="text-muted-foreground text-sm">
              Currently at ImpacterAI but actively looking & interviewing! Available with 2-4 weeks notice 🚀
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Globe className="mt-1 h-5 w-5 text-green-500" />
          <div>
            <p className="text-foreground text-sm font-medium">Location</p>
            <p className="text-muted-foreground text-sm">
              San Francisco Bay Area / Remote
            </p>
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex items-start gap-3 sm:col-span-2">
          <Code2 className="mt-1 h-5 w-5 text-purple-500" />
          <div className="w-full">
            <p className="text-foreground text-sm font-medium">Tech Expertise (E-Shaped)</p>
            <div className="text-muted-foreground grid grid-cols-1 gap-y-1 text-sm sm:grid-cols-2">
              <ul className="decoration-none list-disc pl-4">
                <li><strong>Backend:</strong> Python, Java, Spring Boot, Go</li>
                <li><strong>Distributed Systems:</strong> Kubernetes, Kafka, Redis</li>
                <li><strong>AI/ML:</strong> DeepSeek, PyTorch, FastAPI, LangChain</li>
                <li><strong>Databases:</strong> PostgreSQL, MongoDB, Elasticsearch</li>
              </ul>
              <ul className="list-disc pl-4">
                <li><strong>Full-Stack:</strong> React, TypeScript, Node.js</li>
                <li><strong>Cloud:</strong> AWS, Azure, GCP</li>
                <li><strong>DevOps:</strong> Docker, CI/CD, Terraform</li>
                <li><strong>Performance:</strong> CUDA, Model Optimization</li>
                <li>
                  <a
                    href="/chat?query=What%20are%20your%20skills%3F%20Give%20me%20a%20list%20of%20your%20soft%20and%20hard%20skills."
                    className="cursor-pointer items-center text-blue-500 underline"
                  >
                    See more
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* What I bring */}
      <div className="mt-10">
        <p className="text-foreground mb-2 text-lg font-semibold">
          What I bring
        </p>
        <p className="text-foreground text-sm">
          <strong>E-Shaped Engineer</strong> with production experience across the full stack. <br /> 
          • Built distributed systems handling 5M+ requests/day with sub-second latency <br />
          • Architected microservices, ML pipelines, and frontend applications from 0-to-1 <br />
          • Proven track record: 67% training time reduction, 70% memory optimization, 90% automation improvement <br />
          Deep expertise in multiple domains with the ability to connect and lead across all of them.
        </p>
      </div>

      {/* Goal */}
      <div className="mt-8">
        <p className="text-foreground mb-2 text-lg font-semibold">Looking For</p>
        <p className="text-foreground text-sm">
          Challenging roles where I can leverage my E-shaped skillset - deep backend/distributed systems expertise 
          combined with ML infrastructure and full-stack capabilities. Excited about 0-to-1 products, high-scale 
          systems, and teams that value ownership and impact over titles. Let's build something exceptional! 🚀
        </p>
      </div>

      {/* Contact button */}
      <div className="mt-10 mb-8 flex justify-center">
        <button
          onClick={openMail}
          className="cursor-pointer rounded-full bg-black px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Contact me
        </button>
      </div>
    </motion.div>
  );
};

export default InternshipCard;
