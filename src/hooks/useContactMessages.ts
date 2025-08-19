import { useState, useEffect } from 'react';
import type { ContactMessage } from '@/types/contact';

export function useContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/contact');
        const json = await res.json();
        if (res.ok) {
          setMessages(json.data || []);
        } else {
          setError(json.error || 'Failed to fetch contact messages');
        }
      } catch (err) {
        setError('Failed to fetch contact messages');
      }
      setIsLoading(false);
    }
    fetchMessages();
  }, []);

  return { messages, isLoading, error };
}
