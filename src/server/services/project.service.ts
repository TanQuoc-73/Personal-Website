// src/server/services/project.service.ts
import { supabase } from '@/lib/supabaseClient';
import type { Project } from '@/types/project';

export async function getAllProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });

  return { data, error };
}

export async function getProjects(categoryId?: string) {
  if (categoryId) {
    return getProjectsByCategory(categoryId);
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*');

  return { data, error };
}
export async function getProjectById(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
}

export async function createProject(newProject: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('projects')
    .insert(newProject)
    .select()
    .single();

  return { data, error };
}

export async function updateProject(id: string, updates: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}

export async function deleteProject(id: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  return { error };
}
export async function getProjectsByCategory(categoryId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('category_id', categoryId);

  return { data, error };
}
