'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ProjectStatusSchema } from '@/validations/project.validation';
import type { Project } from '@/types/project';

interface ProjectFormProps {
  onClose: () => void;
  initialData?: Project | null;
  onSuccess?: () => void;
}

export function ProjectForm({ onClose, initialData, onSuccess }: ProjectFormProps) {
  type ProjectStatus = z.infer<typeof ProjectStatusSchema>;
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    short_description: '',
    status: 'in-progress' as ProjectStatus,
    is_featured: false,
    sort_order: 0,
    // Removed like_count as it's managed by the server
    github_url: '',
    demo_url: '',
    featured_image_url: '',
    content: '',
    category_id: '',
    start_date: '',
    end_date: '',
    client: '',
    budget_range: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = !!initialData?.id;

  // Load initial data when in edit mode
  useEffect(() => {
    if (initialData) {
      // Không destructure like_count nữa
      setFormData({
        title: initialData.title,
        slug: initialData.slug,
        description: initialData.description || '',
        short_description: initialData.short_description || '',
        status: initialData.status || 'in-progress',
        is_featured: initialData.is_featured || false,
        sort_order: initialData.sort_order || 0,
        github_url: initialData.github_url || '',
        demo_url: initialData.demo_url || '',
        featured_image_url: initialData.featured_image_url || '',
        content: initialData.content || '',
        category_id: initialData.category_id || '',
        start_date: initialData.start_date || '',
        end_date: initialData.end_date || '',
        client: initialData.client || '',
        budget_range: initialData.budget_range || ''
      });
    }
  }, [initialData]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const url = isEditMode 
        ? `/api/projects/${initialData.id}` 
        : '/api/projects';
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      // Exclude like_count if somehow it exists
      const { like_count, ...cleanFormData } = formData as any;
      
      // Only include fields that are defined in CreateProjectSchema
      const formDataForSubmission: Record<string, any> = {};
      
      // Required fields
      formDataForSubmission.title = cleanFormData.title;
      formDataForSubmission.slug = cleanFormData.slug;
      formDataForSubmission.status = cleanFormData.status;
      
      // Optional fields with proper type conversion
      if (cleanFormData.description) formDataForSubmission.description = cleanFormData.description;
      if (cleanFormData.short_description) formDataForSubmission.short_description = cleanFormData.short_description;
      if (cleanFormData.content) formDataForSubmission.content = cleanFormData.content;
      if (cleanFormData.github_url) formDataForSubmission.github_url = cleanFormData.github_url;
      if (cleanFormData.demo_url) formDataForSubmission.demo_url = cleanFormData.demo_url;
      if (cleanFormData.featured_image_url) formDataForSubmission.featured_image_url = cleanFormData.featured_image_url;
      if (cleanFormData.category_id) formDataForSubmission.category_id = cleanFormData.category_id;
      if (cleanFormData.client) formDataForSubmission.client = cleanFormData.client;
      if (cleanFormData.budget_range) formDataForSubmission.budget_range = cleanFormData.budget_range;
      
      // Convert dates to ISO string if they exist
      if (cleanFormData.start_date) {
        formDataForSubmission.start_date = new Date(cleanFormData.start_date).toISOString();
      }
      if (cleanFormData.end_date) {
        formDataForSubmission.end_date = new Date(cleanFormData.end_date).toISOString();
      }
      
      // Boolean and number fields with defaults
      formDataForSubmission.is_featured = Boolean(cleanFormData.is_featured);
      formDataForSubmission.sort_order = Number(cleanFormData.sort_order) || 0;
      
      console.log('Sending data to server:', JSON.stringify(formDataForSubmission, null, 2));
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataForSubmission),
      });
      
      const responseData = await response.json();
      console.log('API Response:', responseData);
      
      if (!response.ok) {
        // Nếu có thông báo lỗi từ server, hiển thị nó
        if (responseData.error) {
          throw new Error(`Lỗi từ server: ${responseData.error}`);
        }
        // Nếu không có thông báo lỗi cụ thể, sử dụng mã trạng thái
        throw new Error(`Lỗi HTTP: ${response.status} - ${response.statusText}`);
      }
      
      onClose();
      if (onSuccess) onSuccess();
      
    } catch (error) {
      console.error('Error saving project:', error);
      // Hiển thị thông báo lỗi chi tiết hơn
      let errorMessage = 'Có lỗi xảy ra khi lưu dự án';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Xử lý các lỗi phổ biến
        if (error.message.includes('NetworkError')) {
          errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.';
        } else if (error.message.includes('400')) {
          errorMessage = 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin đã nhập.';
        } else if (error.message.includes('401') || error.message.includes('403')) {
          errorMessage = 'Bạn không có quyền thực hiện thao tác này. Vui lòng đăng nhập lại.';
        } else if (error.message.includes('404')) {
          errorMessage = 'Không tìm thấy tài nguyên yêu cầu.';
        } else if (error.message.includes('500')) {
          errorMessage = 'Lỗi máy chủ nội bộ. Vui lòng thử lại sau.';
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Tiêu đề</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="short_description">Mô tả ngắn</Label>
        <Textarea
          id="short_description"
          name="short_description"
          value={formData.short_description}
          onChange={handleChange}
          className="mt-1"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="description">Mô tả đầy đủ (Markdown được hỗ trợ)</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 font-mono min-h-[200px]"
          placeholder="Mô tả chi tiết về dự án..."
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="github_url">URL GitHub</Label>
          <Input
            id="github_url"
            name="github_url"
            type="url"
            value={formData.github_url || ''}
            onChange={handleChange}
            placeholder="https://github.com/username/repo"
          />
        </div>
        <div>
          <Label htmlFor="demo_url">URL Demo</Label>
          <Input
            id="demo_url"
            name="demo_url"
            type="url"
            value={formData.demo_url || ''}
            onChange={handleChange}
            placeholder="https://example.com/demo"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sort_order">Thứ tự sắp xếp</Label>
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            value={formData.sort_order}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="status">Trạng thái</Label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 bg-white"
        >
          {ProjectStatusSchema.options.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="is_featured"
          name="is_featured"
          checked={formData.is_featured}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <Label htmlFor="is_featured" className="text-sm font-medium text-gray-700">
          Nổi bật
        </Label>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          disabled={isLoading}
        >
          Hủy
        </Button>
        <Button 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <span>Đang lưu...</span>
          ) : isEditMode ? (
            'Cập nhật dự án'
          ) : (
            'Tạo dự án'
          )}
        </Button>
      </div>
    </form>
  );
}
