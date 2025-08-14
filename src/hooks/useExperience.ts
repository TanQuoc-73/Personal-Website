import { Experience } from './../types/experiences';
import { useEffect, useState } from 'react';

export function useExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    fetch('/api/experiences')
      .then((res) => res.json())
      .then((res) => {
        setExperiences(res.data || []);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch experiences');
        setIsLoading(false);
      });
  }, []);

  return { experiences, isLoading, error };
}
