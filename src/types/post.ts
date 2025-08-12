import { Database } from '@/types/supabase';

export type Post = Database['public']['Tables']['posts']['Row'];
export type PostInsert = Database['public']['Tables']['posts']['Insert'];
export type PostUpdate = Database['public']['Tables']['posts']['Update'];
// Nếu bạn cần lấy thêm thông tin user liên quan đến post
export type PostWithUser = Post & {
  user: {
    id: string;
    email?: string;
    user_metadata?: {
      name?: string;
      avatar_url?: string;
    };
  };
};
