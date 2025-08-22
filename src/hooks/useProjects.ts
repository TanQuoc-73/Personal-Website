// src/hooks/useProjects.ts
'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Project } from '@/types/project';
import type { CreateProjectInput, ProjectFilter, UpdateProjectInput } from '@/validations/project.validation';

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  details?: Record<string, unknown>;
  count?: number;
  page?: number;
  limit?: number;
};

export type ProjectsQuery = ProjectFilter;

export function useProjects(filters: ProjectsQuery = {}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [count, setCount] = useState<number>(0);
  const [pagination, setPagination] = useState({
    page: filters.page || 1,
    limit: filters.limit || 10,
    totalPages: 0,
  });

  // Hàm tạo URL với query params
  const buildUrl = useCallback((baseUrl: string, params: Record<string, string | number | boolean | undefined | null> = {}) => {
    const url = new URL(baseUrl, window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });
    return url.toString();
  }, []);

  // Hàm xử lý lỗi API
  const handleApiError = (error: unknown, defaultMessage: string) => {
    console.error('API Error:', error);
    const errorMessage = (error && typeof error === 'object' && ('message' in error) && typeof error.message === 'string') 
      ? error.message 
      : (error && typeof error === 'object' && ('error' in error) && typeof error.error === 'string')
        ? error.error
        : defaultMessage;
    setError(errorMessage);
    return { success: false, error: errorMessage };
  };

  // Lấy danh sách projects
  const fetchProjects = useCallback(async (customFilters: ProjectsQuery = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const mergedFilters = { ...filters, ...customFilters };
      const url = buildUrl('/api/projects', mergedFilters);
      
      const response = await fetch(url);
      const result: ApiResponse<Project[]> = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Không thể tải danh sách dự án');
      }
      
      setProjects(result.data || []);
      setCount(result.count || 0);
      
      if (result.page && result.limit) {
        setPagination(prev => ({
          ...prev,
          page: result.page!,
          limit: result.limit!,
          totalPages: Math.ceil((result.count || 0) / result.limit!)
        }));
      }
      
      return { success: true, data: result.data };
    } catch (error) {
      return handleApiError(error, 'Đã xảy ra lỗi khi tải danh sách dự án');
    } finally {
      setIsLoading(false);
    }
  }, [filters, buildUrl]);

  // Tạo mới project
  const createProject = async (projectData: CreateProjectInput) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      
      const result: ApiResponse<Project> = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Không thể tạo dự án mới');
      }
      
      // Làm mới danh sách sau khi tạo
      await fetchProjects();
      return { success: true, data: result.data };
    } catch (error) {
      return handleApiError(error, 'Đã xảy ra lỗi khi tạo dự án');
    } finally {
      setIsLoading(false);
    }
  };

  // Cập nhật project
  const updateProject = async (id: string, updates: UpdateProjectInput) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      const result: ApiResponse<Project> = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Không thể cập nhật dự án');
      }
      
      // Cập nhật danh sách sau khi cập nhật
      setProjects(prev => 
        prev.map(project => 
          project.id === id ? { ...project, ...result.data } : project
        )
      );
      
      return { success: true, data: result.data };
    } catch (error) {
      return handleApiError(error, 'Đã xảy ra lỗi khi cập nhật dự án');
    } finally {
      setIsLoading(false);
    }
  };

  // Xóa project
  const deleteProject = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      
      const result: ApiResponse<void> = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Không thể xóa dự án');
      }
      
      // Cập nhật danh sách sau khi xóa
      setProjects(prev => prev.filter(project => project.id !== id));
      setCount(prev => prev - 1);
      
      return { success: true };
    } catch (error) {
      return handleApiError(error, 'Đã xảy ra lỗi khi xóa dự án');
    } finally {
      setIsLoading(false);
    }
  };

  // Lấy danh sách khi filters thay đổi
  useEffect(() => {
    fetchProjects(filters);
  }, [fetchProjects, JSON.stringify(filters)]);

  return {
    // State
    projects,
    isLoading,
    error,
    count,
    pagination,
    
    // Actions
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    
    // Helpers
    refetch: () => fetchProjects(filters),
  };
}
