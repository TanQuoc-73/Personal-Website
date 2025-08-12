// src/types/project.ts
export interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string;
  short_description?: string;
  content?: string;
  featured_image_url?: string;
  demo_url?: string;
  github_url?: string;
  category_id?: string;
  status: 'in-progress' | 'completed' | 'archived';
  is_featured: boolean;
  sort_order: number;
  start_date?: string;
  end_date?: string;
  client?: string;
  budget_range?: string;
  view_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectTechnology {
  id: string;
  project_id: string;
  technology_name: string;
  category?: string;
  created_at: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  alt_text?: string;
  caption?: string;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}
