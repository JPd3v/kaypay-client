import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LogedUser, authKeyFactory } from 'features/auth';
import {
  Deposit,
  NewDeposit,
  depositsKeyFactory,
  useDepositsModal,
} from 'features/deposits';
import axios from 'lib/axios';

export async function newDeposit(data: NewDeposit) {
  const req = await axios.post('/deposits', data);

  return req.data;
}

export function useNewDeposit() {
  const queryClient = useQueryClient();
  const depositModal = useDepositsModal();

  return useMutation({
    mutationFn: (data: NewDeposit) => newDeposit(data),
    onSuccess: (deposit: Deposit) => {
      queryClient.setQueryData(depositsKeyFactory.details(deposit.id), deposit);
      queryClient.setQueryData<LogedUser>(authKeyFactory.user, (prev) =>
        prev ? { ...prev, balance: prev.balance + deposit.balance } : undefined,
      );
      depositModal.close();
    },
  });
}
