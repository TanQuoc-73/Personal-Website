import { z } from 'zod';

// Schema cho trạng thái project
export const ProjectStatusSchema = z.enum(['in-progress', 'completed', 'archived']);

// Schema cơ bản cho Project
const ProjectBaseSchema = z.object({
  title: z.string().min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
  slug: z.string().min(3, 'Slug phải có ít nhất 3 ký tự').regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'Slug không hợp lệ, chỉ chấp nhận chữ thường, số và dấu gạch ngang'
  ),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự').optional(),
  short_description: z.string().max(200, 'Mô tả ngắn tối đa 200 ký tự').optional(),
  content: z.string().optional(),
  featured_image_url: z.string().url('URL ảnh không hợp lệ').optional(),
  demo_url: z.string().url('URL demo không hợp lệ').optional(),
  github_url: z.string().url('URL GitHub không hợp lệ').optional(),
  category_id: z.string().uuid('ID danh mục không hợp lệ').optional(),
  status: ProjectStatusSchema,
  is_featured: z.boolean().default(false),
  sort_order: z.number().int().default(0),
  start_date: z.string().datetime('Ngày bắt đầu không hợp lệ').optional(),
  end_date: z.string().datetime('Ngày kết thúc không hợp lệ').optional(),
  client: z.string().optional(),
  budget_range: z.string().optional(),
  view_count: z.number().int().nonnegative().default(0),
});

// Schema cho tạo mới Project
export const CreateProjectSchema = ProjectBaseSchema.omit({
  view_count: true,
  like_count: true
});

// Schema cho cập nhật Project
export const UpdateProjectSchema = ProjectBaseSchema.partial()
  .omit({ view_count: true })
  .refine(
    (data) => !(data.end_date && data.start_date && new Date(data.end_date) < new Date(data.start_date)),
    {
      message: 'Ngày kết thúc phải sau ngày bắt đầu',
      path: ['end_date'],
    }
  );

// Schema cho ID của Project
export const ProjectIdSchema = z.string().uuid('ID không hợp lệ');

// Schema cho filter projects
export const ProjectFilterSchema = z.object({
  categoryId: z.string().uuid('ID danh mục không hợp lệ').optional(),
  status: ProjectStatusSchema.optional(),
  search: z.string().optional(),
  isFeatured: z.boolean().optional(),
  sortBy: z.enum(['created_at', 'sort_order', 'view_count', 'like_count']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

// Export các kiểu TypeScript
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
export type ProjectFilter = z.infer<typeof ProjectFilterSchema>;
