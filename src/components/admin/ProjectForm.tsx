'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ProjectStatusSchema } from '@/validations/project.validation';

export function ProjectForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    short_description: '',
    status: 'in-progress' as const,
    is_featured: false,
    featured_image_url: '',
    demo_url: '',
    github_url: '',
    category_id: '',
    sort_order: 0,
    start_date: '',
    end_date: '',
    content: '',
    view_count: 0,
    like_count: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý submit form ở đây
    console.log('Form submitted:', formData);
    // Gọi API để tạo dự án mới
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        onClose();
        // Có thể thêm thông báo thành công ở đây
      }
    } catch (error) {
      console.error('Error creating project:', error);
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
        <Label htmlFor="description">Mô tả đầy đủ</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1"
          rows={5}
        />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <Label htmlFor="featured_image_url">Ảnh đại diện (URL)</Label>
          <Input
            id="featured_image_url"
            name="featured_image_url"
            type="url"
            value={formData.featured_image_url}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="demo_url">URL Demo</Label>
          <Input
            id="demo_url"
            name="demo_url"
            type="url"
            value={formData.demo_url}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="github_url">GitHub URL</Label>
          <Input
            id="github_url"
            name="github_url"
            type="url"
            value={formData.github_url}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="category_id">Danh mục</Label>
          <Input
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="start_date">Ngày bắt đầu</Label>
          <Input
            id="start_date"
            name="start_date"
            type="date"
            value={formData.start_date}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="end_date">Ngày kết thúc</Label>
          <Input
            id="end_date"
            name="end_date"
            type="date"
            value={formData.end_date}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
      </div>

      <div className="mt-6">
        <Label htmlFor="content">Nội dung chi tiết</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="mt-1 min-h-[200px]"
          rows={8}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 mt-6 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit">Tạo dự án</Button>
      </div>
    </form>
  );
}
