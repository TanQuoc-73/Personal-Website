// src/hooks/useSkills.ts
'use client';

import { useEffect, useState } from 'react';
import type { Skill } from '@/types/skill';

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => res.json())
      .then((res) => {
        setSkills(res.data || []);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch skills');
        setIsLoading(false);
      });
  }, []);

  return { skills, isLoading, error };
}
