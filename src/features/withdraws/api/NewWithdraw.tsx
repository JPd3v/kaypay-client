import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LogedUser, authKeyFactory } from 'features/auth';
import {
  NewWithdrawType,
  Withdraw,
  useWithdrawsModal,
} from 'features/withdraws';

import axios from 'lib/axios';

export async function newWithdraw(data: NewWithdrawType) {
  const req = await axios.post<Withdraw>('/withdraws', data);

  return req.data;
}

export function useNewWithdraw() {
  const queryClient = useQueryClient();
  const withdrawsModal = useWithdrawsModal();
  return useMutation({
    mutationFn: (formData: NewWithdrawType) => newWithdraw(formData),
    onSuccess: (_response, formData) => {
      withdrawsModal.close();
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
