import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LogInType, LogedUser, useLogInForm } from 'features/auth';
import authKeys from 'features/auth/utils/authKeyFactory';
import axios from 'lib/axios';

export async function logInUser(data: LogInType) {
  const req = await axios.post<LogedUser>('auth/log-in', data);

  return req.data;
}

export function useLogInUser() {
  const logInFormModal = useLogInForm();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formdata: LogInType) => logInUser(formdata),
    onSuccess: (userInformation) => {
      queryClient.setQueryData(authKeys.user, userInformation);
      logInFormModal.close();
    },
  });
}
