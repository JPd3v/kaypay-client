import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSignUpForm } from 'features/auth';
import { LogedUser } from 'features/auth/types';
import authKeys from 'features/auth/utils/authKeyFactory';
import { SignUpType } from 'features/auth/utils/schemas';
import axios from 'lib/axios';

export async function signUpUser(newUserData: SignUpType): Promise<LogedUser> {
  const req = await axios.post<LogedUser>('/auth/sign-up', newUserData);

  return req.data;
}

export function useSignUpUser() {
  const queryClient = useQueryClient();
  const signUpForm = useSignUpForm();
  return useMutation({
    mutationFn: (formData: SignUpType) => signUpUser(formData),
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.user, data);
      signUpForm.close();
    },
  });
}
