import { Experience } from '../../types/experiences';
import { supabase } from '@/lib/supabaseClient';

export async function getAllExperiences() {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('sort_order', { ascending: true });

  return { data, error };
}
export async function getExperienceById(id: string) {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
}
export async function createExperience(newExperience: Omit<Experience, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('experiences')
    .insert(newExperience)
    .select()
    .single();

  return { data, error };
}
export async function updateExperience(id: string, updates: Partial<Experience>) {
  const { data, error } = await supabase
    .from('experiences')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}