import { useQuery } from '@tanstack/react-query';
import { LogedUser, authKeyFactory } from 'features/auth';
import axios from 'lib/axios';

export async function getAuthInfo() {
  const req = await axios.get<LogedUser>('/auth/me', { withCredentials: true });

  return req.data;
}

export function useAuth() {
  return useQuery({
    queryKey: authKeyFactory.user,
    queryFn: getAuthInfo,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
}
