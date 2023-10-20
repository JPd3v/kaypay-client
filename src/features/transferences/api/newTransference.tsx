import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LogedUser, authKeyFactory } from 'features/auth';
import {
  NewTransferenceType,
  useTransferencesModal,
} from 'features/transferences';
import axios from 'lib/axios';

export async function newTransFerence(data: NewTransferenceType) {
  const req = await axios.post<string>('/transferences', data);

  return req.data;
}

export function useNewTransference() {
  const queryClient = useQueryClient();
  const transferenceModal = useTransferencesModal();

  return useMutation({
    mutationFn: (formData: NewTransferenceType) => newTransFerence(formData),
    onSuccess: (_data, formData) => {
      transferenceModal.close();
      queryClient.setQueryData<LogedUser>(authKeyFactory.user, (user) => {
        if (!user) return undefined;
        return {
          ...user,
          balance: user.balance - formData.balance,
        };
      });
    },
  });
}
