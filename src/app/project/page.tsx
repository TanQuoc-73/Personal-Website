'use client';

import { useState } from 'react';
import ProjectList from '@/components/ProjectList';

export default function ProjectPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(12); // Hoặc bỏ state này và quản lý limit trong ProjectList

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="search"
          placeholder="Search projects by name or technology..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page when search changes
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-black/10 text-white placeholder-white/70"
        />
      </div>

      {/* Project list */}
      <section>
        <ProjectList/>
      </section>
    </main>
  );
}
