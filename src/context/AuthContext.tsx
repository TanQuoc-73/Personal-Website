// src/context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import { getUserProfile, ensureUserProfile } from '@/server/services/user.service';
import type { UserProfile } from '@/types/user';

interface AuthContextType {
  user: User | null;             // Supabase Auth user info (id, email,...)
  session: Session | null;
  profile: UserProfile | null;   // User profile data from your 'users' table (role,...)
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // 1. Lấy session và user auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 2. Khi user.id thay đổi, lấy profile trong bảng users
  useEffect(() => {
    if (!user?.id) {
      setProfile(null);
      return;
    }
    // Ensure a row exists in `users` table for this auth user. If not, create it.
    (async () => {
      // Try to get profile first
      const { data, error } = await getUserProfile(user.id);
      if (error) {
        console.error('getUserProfile error:', error);
        setProfile(null);
        return;
      }

      if (data) {
        setProfile(data);
        return;
      }

      // If not found, create a minimal profile from auth user data
      const { data: created, error: createError } = await ensureUserProfile(
        user.id,
        user.email ?? null,
        user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
        // Supabase stores avatar at user.user_metadata?.avatar_url or .picture depending on provider
        (user.user_metadata as any)?.avatar_url ?? (user.user_metadata as any)?.picture ?? null,
        'user'
      );

      if (createError) {
        // Log structured info if available
        if (typeof createError === 'object' && createError !== null) {
          const e: any = createError;
          console.error('ensureUserProfile error:', e.message ?? null, e.details ?? null, e.hint ?? null, e.code ?? null, e.status ?? null);
        } else {
          console.error('ensureUserProfile error:', createError);
        }

        setProfile(null);
        return;
      }

      setProfile(created);
    })();
  }, [user?.id]);

  // 3. Đăng nhập với Google
  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) console.error('Google sign-in error:', error.message);
  }

  // 4. Đăng xuất
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Sign out error:', error.message);
    setUser(null);
    setSession(null);
    setProfile(null);
  }

  return (
    <AuthContext.Provider value={{ user, session, profile, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
