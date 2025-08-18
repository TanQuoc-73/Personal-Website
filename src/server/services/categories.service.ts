import { Category } from '../../types/categories';
import { supabase } from '@/lib/supabaseClient';

export async function getAllCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('id', { ascending: true }); 

  return { data, error };
}
export async function getCategoriesById(id: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
}
export async function createCategory(newCategories: Omit<Category, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('categories')
    .insert(newCategories)
    .select()
    .single();

  return { data, error };
}
export async function updateExperience(id: string, updates: Partial<Category>) {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}