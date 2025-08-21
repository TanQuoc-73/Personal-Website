export interface UserProfile {
  id: string;
  email: string | null;
  name?: string | null;
  role?: string | null;
  avatar_url?: string | null;
}
