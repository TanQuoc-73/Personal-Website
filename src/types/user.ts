export interface UserProfile {
  id: string;
  email: string | null; 
  full_name?: string;
  role?: string | null;
  avatar_url?: string | null;
}
