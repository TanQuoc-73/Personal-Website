'use client';

import { useState } from 'react';
import ProjectList from '@/components/ProjectList';

export default function ProjectPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(12); // Hoặc bỏ state này và quản lý limit trong ProjectList

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">


      {/* Project list */}
      <section>
        <ProjectList/>
      </section>
    </main>
  );
}
