'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: string | null;         // Thêm trường lưu role
  userName: string | null;     // Thêm trường lấy tên Gmail đăng nhập
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Lấy session và user khi component mount
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setUserName(data.session?.user?.user_metadata?.name || null);

      // Lấy role từ bảng users theo user.id
      if (data.session?.user) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.session.user.id)
          .single();

        if (!error && userData) {
          setRole(userData.role);
        } else {
          setRole(null);
        }
      }
    });

    // Lắng nghe thay đổi trạng thái đăng nhập/đăng xuất
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setUserName(session?.user?.user_metadata?.name || null);

      if (session?.user) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (!error && userData) {
          setRole(userData.role);
        } else {
          setRole(null);
        }
      } else {
        setRole(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) console.error('Google sign-in error: ', error.message);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Sign out error: ', error.message);
  }

  return (
    <AuthContext.Provider value={{ user, session, role, userName, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook sử dụng context dễ dàng
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
