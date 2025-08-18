import { Category } from './../types/categories';
import { useEffect, useState } from 'react';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((res) => {
        setCategories(res.data || []);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch categories');
        setIsLoading(false);
      });
  }, []);

  return { categories, isLoading, error };
}
