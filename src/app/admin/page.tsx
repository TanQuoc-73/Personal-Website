// src/app/page.tsx
'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
//   const { user, profile } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (profile?.role === 'admin') {
//       router.replace('/admin');
//     }
//   }, [profile, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Home Page</h1>

    </main>
  );
}
