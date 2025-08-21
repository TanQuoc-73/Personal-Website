// src/server/services/user.service.ts
import { supabase } from '@/lib/supabaseClient';

export interface UserProfile {
  id: string;
  email: string | null;
  name?: string | null;
  role?: string | null;
  avatar_url?: string | null;
  // Thêm các trường khác nếu cần
}

export async function getUserProfile(userId: string): Promise<{ data: UserProfile | null; error: any | null }> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, full_name, role, avatar_url')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    return { data: null, error };
  }

  if (!data) return { data: null, error: null };

  // Map DB fields to UserProfile shape
  const profile: UserProfile = {
    id: data.id,
    email: data.email,
    name: data.full_name ?? null,
    role: data.role ?? null,
    avatar_url: data.avatar_url ?? null,
  };

  return { data: profile, error: null };
}

/**
 * Ensure a user row exists in `users` table. If not present, insert a minimal record.
 * This does a read-then-insert to avoid overwriting existing fields (like role).
 */
export async function ensureUserProfile(
  userId: string,
  email?: string | null,
  full_name?: string | null,
  avatar_url?: string | null,
  defaultRole: string | null = 'user'
): Promise<{ data: UserProfile | null; error: any | null }> {
  // Check existing
  const existing = await getUserProfile(userId);
  try {
    // Check existing
    if (existing.error) return { data: null, error: existing.error };
    if (existing.data) return { data: existing.data, error: null };

    // Insert minimal record. Use .select().single() to return the created row
    const { data: created, error } = await supabase
      .from('users')
      .insert({
        id: userId,
        email: email ?? null,
        full_name: full_name ?? null,
        avatar_url: avatar_url ?? null,
        role: defaultRole,
      })
      .select('id, email, full_name, role, avatar_url')
      .single();

    if (error) {
      // Map supabase error to plain object for better logging
      const err = {
        message: (error as any).message ?? null,
        details: (error as any).details ?? null,
        hint: (error as any).hint ?? null,
        code: (error as any).code ?? null,
        status: (error as any).status ?? null,
      };
      return { data: null, error: err };
    }

    const profile: UserProfile = {
      id: created.id,
      email: created.email,
      name: created.full_name ?? null,
      role: created.role ?? null,
      avatar_url: created.avatar_url ?? null,
    };

    return { data: profile, error: null };
  } catch (e: any) {
    return { data: null, error: { message: e?.message ?? String(e) } };
  }
}
