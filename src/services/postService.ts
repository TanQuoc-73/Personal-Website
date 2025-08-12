import { supabase } from '@/lib/supabase';
import { Post, PostInsert, PostUpdate } from '@/types/post';

export const postService = {
  // Lấy tất cả bài viết
  async getPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Post[];
  },

  // Lấy bài viết theo ID
  async getPostById(id: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Post;
  },

  // Tạo bài viết mới
  async createPost(post: PostInsert) {
    const { data, error } = await supabase
      .from('posts')
      .insert(post)
      .select()
      .single();
    
    if (error) throw error;
    return data as Post;
  },

  // Cập nhật bài viết
  async updatePost(id: string, updates: PostUpdate) {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Post;
  },

  // Xóa bài viết
  async deletePost(id: string) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Lấy bài viết kèm thông tin người đăng
  async getPostsWithUser() {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        user:user_id (id, email, user_metadata)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as unknown as PostWithUser[];
  }
};
