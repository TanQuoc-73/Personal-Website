import { supabase } from '@/lib/supabaseClient';
import type { ContactMessage } from '@/types/contact';

export async function createContactMessage(data: Omit<ContactMessage, 'id' | 'is_read' | 'replied_at' | 'created_at'>) {
  const insertData = {
    ...data,
    is_read: false,
    replied_at: null,
  };

  const { data: created, error } = await supabase
    .from('contact_messages')
    .insert(insertData)
    .select()
    .single();

  return { data: created, error };
}

export async function getContactMessages() {
  // Optionally add pagination or filtering here
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  return { data, error };
}
