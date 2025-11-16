'use client';

import { Suspense } from 'react';
import Chat from '@/components/chat/chat';

// This is automatically dynamic because it's a client component using useSearchParams()
export default function Page() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <Chat />
    </Suspense>
  );
}