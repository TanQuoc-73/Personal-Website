// src/hooks/useProjects.ts
'use client';

import { useEffect, useState } from 'react';
import type { Project } from '@/types/project';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((res) => {
        setProjects(res.data || []);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch projects');
        setIsLoading(false);
      });
  }, []);

  return { projects, isLoading, error };
}
