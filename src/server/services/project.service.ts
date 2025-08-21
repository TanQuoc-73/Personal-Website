import { supabase } from '@/lib/supabaseClient';
import type { Project } from '@/types/project';

type ProjectFilters = {
  categoryId?: string;
  status?: string;        // ví dụ: "completed", "in-progress"
  search?: string;        // tìm theo title/description
  isFeatured?: boolean;
  sortBy?: 'created_at' | 'sort_order' | 'view_count' | 'like_count';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
};

// =============================
// LẤY DANH SÁCH PROJECTS (có filter/search/sort/pagination)
// =============================
export async function getProjects(filters: ProjectFilters = {}) {
  const {
    categoryId,
    status,
    search,
    isFeatured,
    sortBy = 'created_at',
    sortOrder = 'desc',
    page = 1,
    limit = 10,
  } = filters;

  let query = supabase.from('projects').select('*', { count: 'exact' });

  // filter
  if (categoryId) query = query.eq('category_id', categoryId);
  if (status) query = query.eq('status', status);
  if (isFeatured !== undefined) query = query.eq('is_featured', isFeatured);

  // search theo title hoặc description
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }

  // sort
  query = query.order(sortBy, { ascending: sortOrder === 'asc' });

  // pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  return { data, error, count };
}

// =============================
// LẤY TẤT CẢ PROJECTS (không filter)
// =============================
export async function getAllProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });

  return { data, error };
}

// =============================
// LẤY PROJECT THEO ID
// =============================
export async function getProjectById(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
}

// =============================
// TẠO PROJECT MỚI
// =============================
export async function createProject(
  newProject: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'view_count' | 'like_count'>
) {
  const { data, error } = await supabase
    .from('projects')
    .insert(newProject)
    .select()
    .single();

  return { data, error };
}

// =============================
// CẬP NHẬT PROJECT
// =============================
export async function updateProject(id: string, updates: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}

// =============================
// XOÁ PROJECT
// =============================
export async function deleteProject(id: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  return { error };
}

// =============================
// LẤY PROJECT THEO CATEGORY
// =============================
export async function getProjectsByCategory(categoryId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('category_id', categoryId);

  return { data, error };
}
