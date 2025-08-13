'use client';

import { useEffect, useState } from 'react';
import type { BlogPost } from '@/types/blog_post';

export function useBlog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        
        if (!response.ok) {
          throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
        }
        
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Có lỗi xảy ra khi tải bài viết');
        }
        
        setBlogs(result.data || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Không thể tải danh sách bài viết';
        setError(errorMessage);
        console.error('Lỗi khi tải bài viết:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { 
    blogs, 
    isLoading, 
    error,
    refetch: () => {
      setIsLoading(true);
      setError(null);
      fetch('/api/blog')
        .then(res => res.json())
        .then(res => setBlogs(res.data || []))
        .catch(err => setError('Lỗi khi tải lại dữ liệu'))
        .finally(() => setIsLoading(false));
    }
  };
}
