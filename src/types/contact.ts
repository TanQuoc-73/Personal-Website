export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  company?: string;
  is_read: boolean;
  replied_at?: string | null;
  created_at: string;
}
