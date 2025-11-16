'use client';

import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import React from 'react';

interface ContactIconsProps {
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
  phone?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 [&_svg]:size-4',
  md: 'h-10 w-10 [&_svg]:size-5',
  lg: 'h-12 w-12 [&_svg]:size-6',
};

export function ContactIcons({
  className,
  iconSize = 'sm',
  githubUrl = 'https://github.com/yash1thredddy',
  linkedinUrl = 'https://www.linkedin.com/in/yash1th26/',
  email = 'yashwanth2632@gmail.com',
  phone = '+1 (312)-646-8975',
}: ContactIconsProps) {
  const handleClick = (type: string, value: string) => {
    let url = '';
    
    switch (type) {
      case 'github':
        url = value;
        break;
      case 'linkedin':
        url = value;
        break;
      case 'email':
        url = `mailto:${value}`;
        break;
      case 'phone':
        url = `tel:${value}`;
        break;
    }

    if (url) {
      window.open(url, type === 'email' || type === 'phone' ? '_self' : '_blank', 'noopener,noreferrer');
    }
  };

  const iconButtonClass = cn(
    'flex items-center justify-center rounded-lg bg-zinc-950 hover:bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-all duration-200 hover:scale-110 cursor-pointer border border-gray-700 dark:border-gray-300',
    sizeClasses[iconSize]
  );

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <button
        onClick={() => handleClick('github', githubUrl)}
        className={iconButtonClass}
        aria-label="Visit GitHub profile"
        title="GitHub"
      >
        <Github />
      </button>
      
      <button
        onClick={() => handleClick('linkedin', linkedinUrl)}
        className={iconButtonClass}
        aria-label="Visit LinkedIn profile"
        title="LinkedIn"
      >
        <Linkedin />
      </button>
      
      <button
        onClick={() => handleClick('email', email)}
        className={iconButtonClass}
        aria-label="Send email"
        title={`Email: ${email}`}
      >
        <Mail />
      </button>
      
      <button
        onClick={() => handleClick('phone', phone)}
        className={iconButtonClass}
        aria-label="Call phone"
        title={`Phone: ${phone}`}
      >
        <Phone />
      </button>
    </div>
  );
}

