import {supabase } from '@/lib/supabaseClient';

import { Skill } from '@/types/skill';

export async function getAllSkills(): Promise<{ data: Skill[] | null; error: any }> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true });
  return { data, error };
}

export async function getSkillById(id: string) {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
}

export async function createSkill(skill: Omit<Skill, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('skills')
    .insert(skill)
    .select()
    .single();
  return { data, error };
}

export async function updateSkill(id: string, updates: Partial<Skill>) {
  const { data, error } = await supabase
    .from('skills')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
}

export async function deleteSkill(id: string) {
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id);
  return { error };
}