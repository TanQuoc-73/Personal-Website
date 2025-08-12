// server/services/user.service.ts (hoặc src/server/services/user.service.ts)
import { supabase } from '@/lib/supabaseClient';

export interface UserProfile {
  id: string;
  email: string | null;
  name?: string | null;
  // thêm các trường khác nếu có
}

export async function getUserProfile(userId: string): Promise<{ data: UserProfile | null; error: Error | null }> {
  const { data, error } = await supabase
    .from<UserProfile>('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}
