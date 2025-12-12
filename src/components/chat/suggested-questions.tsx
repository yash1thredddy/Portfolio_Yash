'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export function SuggestedQuestions({ questions, onQuestionClick }: SuggestedQuestionsProps) {
  if (!questions || questions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mt-4 space-y-2"
    >
      <p className="text-xs text-muted-foreground uppercase tracking-wide px-2">
        Suggested Questions
      </p>
      <div className="flex flex-col gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={() => onQuestionClick(question)}
            className="justify-between text-left h-auto py-3 px-4 group hover:bg-accent/50 transition-colors"
          >
            <span className="text-sm font-normal flex-1">{question}</span>
            <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        ))}
      </div>
    </motion.div>
  );
}

// Smart question suggestions based on context
export function getSuggestedQuestions(lastMessage: string): string[] {
  const lowerMessage = lastMessage.toLowerCase();

  // Experience-related
  if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
    return [
      "What was your biggest technical challenge at ImpacterAI?",
      "Can you deep dive into the multi-agent orchestration engine?",
      "How did you achieve 5× throughput improvement?"
    ];
  }

  // Projects-related
  if (lowerMessage.includes('project') || lowerMessage.includes('built') || lowerMessage.includes('portfolio')) {
    return [
      "Tell me about the Distributed Consensus KV Store",
      "How did you optimize the Vector Search Engine?",
      "What's the architecture behind the LLM Optimization Pipeline?"
    ];
  }

  // Skills-related
  if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('stack')) {
    return [
      "What's your experience with Kafka and event-driven systems?",
      "How have you used CUDA for ML optimization?",
      "Tell me about your distributed systems expertise"
    ];
  }

  // AI/ML related
  if (lowerMessage.includes('ai') || lowerMessage.includes('ml') || lowerMessage.includes('llm') || lowerMessage.includes('model')) {
    return [
      "How did you reduce GPU memory usage by 68%?",
      "What's your approach to LLM optimization?",
      "Tell me about the AI bias mitigation research"
    ];
  }

  // Performance/Optimization
  if (lowerMessage.includes('performance') || lowerMessage.includes('optim') || lowerMessage.includes('latency')) {
    return [
      "How do you approach performance optimization?",
      "What techniques reduced latency by 35-75%?",
      "Tell me about scaling to 5M+ events per day"
    ];
  }

  // General introduction
  if (lowerMessage.includes('who') || lowerMessage.includes('about you') || lowerMessage.includes('introduction')) {
    return [
      "Tell me about your work experience",
      "What are your key projects?",
      "Are you looking for a job?"
    ];
  }

  // Job seeking
  if (lowerMessage.includes('looking') || lowerMessage.includes('available') || lowerMessage.includes('hiring')) {
    return [
      "What kind of roles are you interested in?",
      "When are you available to start?",
      "What's your ideal work environment?"
    ];
  }

  // Default suggestions - general exploration
  return [
    "What are your most impressive technical achievements?",
    "Tell me about your distributed systems projects",
    "What technologies are you most excited about?"
  ];
}
