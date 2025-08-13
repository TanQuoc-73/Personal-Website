export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image_url?: string;
  is_published: boolean;
  is_featured: boolean;
  view_count: number;
  like_count: number;
  reading_time?: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
  author_id: string;
  category_id?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface BlogPostTag {
  id: string;
  post_id: string;
  tag_id: string;
  created_at: string;
}

export interface BlogComment {
  id: string;
  post_id: string;
  parent_id?: string;
  author_name: string;
  author_email: string;
  content: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPostWithRelations extends BlogPost {
  category?: BlogCategory;
  tags?: BlogTag[];
  comments?: BlogComment[];
  author?: {
    id: string;
    name: string;
    avatar_url?: string;
  };
}