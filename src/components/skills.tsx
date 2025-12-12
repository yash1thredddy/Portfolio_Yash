'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Code, Cpu, PenTool, Users } from 'lucide-react';
import { memo } from 'react';

const Skills = memo(() => {
  const skillsData = [
    {
      category: 'Languages',
      icon: <Code className="h-5 w-5" />,
      skills: [
        'Java',
        'Python',
        'Go',
        'C#',
        'C++',
        'JavaScript',
        'TypeScript',
        'SQL',
        'Bash',
        'CUDA',
      ],
      color: 'bg-blue-50 text-blue-600 border border-blue-200',
    },
    {
      category: 'Backend & Frameworks',
      icon: <Cpu className="h-5 w-5" />,
      skills: [
        'Spring Boot',
        'FastAPI',
        'Node.js',
        'Express',
        'Django',
        'gRPC',
        'Hibernate',
        'GraphQL',
        'Microservices',
        'RESTful APIs',
      ],
      color: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    },
    {
      category: 'Frontend',
      icon: <Code className="h-5 w-5" />,
      skills: [
        'React.js',
        'Next.js',
        'Redux',
        'TypeScript',
        'WebSockets',
        'WebRTC',
        'D3.js',
        'Tailwind CSS',
        'Server-side Events',
      ],
      color: 'bg-purple-50 text-purple-600 border border-purple-200',
    },
    {
      category: 'AI/ML & Data',
      icon: <Cpu className="h-5 w-5" />,
      skills: [
        'LangChain',
        'RAG Pipeline',
        'PyTorch',
        'TensorFlow',
        'Hugging Face',
        'OpenAI API',
        'DeepSeek API',
        'Prompt Engineering',
        'Model Pruning',
        'Quantization',
        'MLflow',
      ],
      color: 'bg-indigo-50 text-indigo-600 border border-indigo-200',
    },
    {
      category: 'Databases',
      icon: <PenTool className="h-5 w-5" />,
      skills: [
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'MySQL',
        'Elasticsearch',
        'Cassandra',
        'DynamoDB',
        'Vector Databases',
        'BigQuery',
      ],
      color: 'bg-rose-50 text-rose-600 border border-rose-200',
    },
    {
      category: 'DevOps & Cloud',
      icon: <PenTool className="h-5 w-5" />,
      skills: [
        'AWS',
        'Azure',
        'GCP',
        'Docker',
        'Kubernetes',
        'CI/CD',
        'Terraform',
        'GitHub Actions',
        'NGINX',
        'Linux',
      ],
      color: 'bg-cyan-50 text-cyan-600 border border-cyan-200',
    },
    {
      category: 'Tools & Message Queues',
      icon: <PenTool className="h-5 w-5" />,
      skills: [
        'Kafka',
        'RabbitMQ',
        'Redis',
        'Prometheus',
        'Grafana',
        'Spark',
        'Flink',
        'Git',
        'Postman',
        'npm',
      ],
      color: 'bg-orange-50 text-orange-600 border border-orange-200',
    },
    {
      category: 'Soft Skills',
      icon: <Users className="h-5 w-5" />,
      skills: [
        'Distributed Systems Design',
        'System Architecture',
        'Problem-solving',
        'Code Review',
        'Technical Leadership',
        'Cross-functional Collaboration',
      ],
      color: 'bg-amber-50 text-amber-600 border border-amber-200',
    },
  ];

  // Animation variants - Faster for immediate display
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Faster stagger
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }, // Faster animation
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 }, // Faster badges
    },
  };

  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className="mx-auto w-full max-w-5xl rounded-4xl"
      style={{ contain: 'layout style paint' }}
    >
      <Card className="w-full border-none bg-transparent px-0 pb-12 text-black shadow-none dark:text-white">
        <CardHeader className="px-0 pb-1">
          <CardTitle className="text-primary px-0 text-4xl font-bold">
            Skills & Expertise
          </CardTitle>
        </CardHeader>

        <CardContent className="px-0">
          <motion.div
            className="space-y-8 px-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {skillsData.map((section, index) => (
              <motion.div
                key={index}
                className="space-y-3 px-0"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2">
                  {section.icon}
                  <h3 className="text-accent-foreground text-lg font-semibold">
                    {section.category}
                  </h3>
                </div>

                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {section.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      variants={badgeVariants}
                      whileHover={{
                        scale: 1.04,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Badge className={`border px-3 py-1.5 font-normal`}>
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

Skills.displayName = 'Skills';

export default Skills;
