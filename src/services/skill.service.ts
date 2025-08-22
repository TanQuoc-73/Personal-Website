// src/server/services/skill.service.ts
import { supabase } from '@/lib/supabaseClient';
import type { Skill } from '@/types/skill';

export async function getAllSkills(): Promise<{ data: Skill[] | null; error: Error | unknown }> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true });
  return { data, error };
}

