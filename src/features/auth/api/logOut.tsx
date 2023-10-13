import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LogOutResponse, authKeyFactory } from 'features/auth';
import axios from 'lib/axios';

export async function logOut() {
  const req = await axios.post<LogOutResponse>('/auth/log-out');
  return req.data;
}

export function useLogOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: authKeyFactory.user,
    mutationFn: logOut,
    onSuccess: async () => {
      await queryClient.resetQueries();
    },
  });
}
