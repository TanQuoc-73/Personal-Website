// src/hooks/useProjects.ts
'use client';

import { useEffect, useState } from 'react';
import type { Project } from '@/types/project';

export type ProjectsQuery = {
  categoryId?: string;
  status?: string; // 'completed' | 'in-progress' | 'archived'
  search?: string;
  isFeatured?: boolean;
  sortBy?: 'created_at' | 'sort_order' | 'view_count' | 'like_count';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
};

export function useProjects(filters: ProjectsQuery = {}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [count, setCount] = useState<number | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.categoryId) params.set('categoryId', filters.categoryId);
    if (filters.status) params.set('status', filters.status);
    if (filters.search) params.set('search', filters.search);
    if (typeof filters.isFeatured === 'boolean') params.set('isFeatured', String(filters.isFeatured));
    if (filters.sortBy) params.set('sortBy', filters.sortBy);
    if (filters.sortOrder) params.set('sortOrder', filters.sortOrder);
    if (typeof filters.page === 'number') params.set('page', String(filters.page));
    if (typeof filters.limit === 'number') params.set('limit', String(filters.limit));

    const url = params.toString() ? `/api/projects?${params.toString()}` : '/api/projects';

    setIsLoading(true);
    setError(null);

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setProjects(res.data || []);
        setCount(res.count);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch projects');
        setIsLoading(false);
      });
    // Stringify filters to track changes shallowly
  }, [JSON.stringify(filters)]);

  return { projects, isLoading, error, count };
}
