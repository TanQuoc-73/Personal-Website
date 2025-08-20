import { useState, useEffect } from 'react';
import type { UserProfile } from '@/types/user';

export function useUser(userId: string | null) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      return;
    }
    setIsLoading(true);
    fetch(`/api/get-user-role?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setProfile(data);
        } else {
          setProfile(null);
          console.error('Fetch user profile error:', data.error);
        }
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  return { profile, isLoading };
}
