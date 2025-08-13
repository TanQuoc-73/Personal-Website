// src/server/services/project.service.ts
import { supabase } from '@/lib/supabaseClient';
import type { BlogPost } from '@/types/blog_post';

export async function getAllBlog() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  return { data, error };
}

export async function getBlogById(id: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
}

export async function createBlog(newBlog: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(newBlog)
    .select()
    .single();

  return { data, error };
}

export async function updateBlog(id: string, updates: Partial<BlogPost>) {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}

export async function deleteBlog(id: string) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  return { error };
}
