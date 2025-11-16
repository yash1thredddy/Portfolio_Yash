'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Linkedin, Github, Instagram, MapPin } from 'lucide-react';

export function Contact() {
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: 'Email',
      value: 'yashwanth2632@gmail.com',
      href: 'mailto:yashwanth2632@gmail.com',
      color: 'text-blue-600'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: 'Phone',
      value: '+1 (312)-646-8975',
      href: 'tel:+13126468975',
      color: 'text-green-600'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'Location',
      value: 'San Francisco, CA',
      href: '#',
      color: 'text-purple-600'
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      title: 'LinkedIn',
      value: 'yash1th26',
      href: 'https://www.linkedin.com/in/yash1th26/',
      color: 'text-blue-700'
    },
    {
      icon: <Github className="h-5 w-5" />,
      title: 'GitHub',
      value: 'yash1thredddy',
      href: 'https://github.com/yash1thredddy',
      color: 'text-gray-800'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold dark:text-white">Get in Touch</h2>
        <p className="text-muted-foreground">
          I'm always excited to connect with fellow engineers, discuss opportunities, or chat about distributed systems, AI/ML, and building scalable products!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactInfo.map((contact, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${contact.color}`}>
                  {contact.icon}
                </div>
                <CardTitle className="text-lg dark:text-white">{contact.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base font-medium mb-3 dark:text-gray-300">
                {contact.value}
              </CardDescription>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                onClick={() => window.open(contact.href, '_blank')}
              >
                {contact.title === 'Location' ? 'View on Map' : `Open ${contact.title}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center space-y-4 pt-6">
        <div className="bg-accent dark:bg-gray-800 rounded-lg p-6 border dark:border-gray-700">
          <h3 className="font-semibold mb-2 dark:text-white">What I'm Looking For</h3>
          <p className="text-sm text-muted-foreground dark:text-gray-300">
            • Software Engineering roles • Distributed Systems & Backend Architecture • AI/ML Infrastructure • 
            Startup opportunities (0-to-1 products) • Open source contributions
          </p>
        </div>
        
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          Feel free to reach out for collaborations, job opportunities, or just to discuss distributed systems, AI/ML infrastructure, and building scalable products! 
          I'm particularly interested in high-impact projects at the intersection of backend engineering and AI.
        </p>
      </div>
    </div>
  );
}
