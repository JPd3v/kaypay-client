/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { Spinner } from 'components';
import {
  NewWithdrawType,
  newWithdrawSchema,
  useNewWithdraw,
} from 'features/withdraws';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ZodIssue } from 'zod';

export default function NewWithdrawForm() {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<NewWithdrawType>({
    mode: 'all',
    resolver: zodResolver(newWithdrawSchema),
  });

  const newWithdraw = useNewWithdraw();

  useEffect(() => {
    if (isAxiosError<ZodIssue[]>(newWithdraw.error)) {
      if (newWithdraw.error.response?.status === 400) {
        newWithdraw.error.response?.data?.forEach((error) => {
          error.path.forEach((path) => {
            setError(path as keyof NewWithdrawType, { message: error.message });
          });
        });
      }

      if (newWithdraw.error.response?.status === 500) {
        setError('root', { message: 'Internal Server Error' });
      }
    }
  }, [setError, newWithdraw.error]);

  function onSubmit(data: NewWithdrawType) {
    setError('balance', { message: 'error.message' });
    newWithdraw.mutate(data);
  }

  return (
    <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl">Bank Withdraw</h2>

      <label htmlFor="bank" className="flex flex-col">
        Bank Name
        <input
          type="text"
          id="bank"
          {...register('bankName')}
          aria-labelledby="bank-error"
        />
      </label>

      {errors.bankName ? (
        <p className="mt-1 text-red-600" id="bank-error">
          {errors.bankName.message}
        </p>
      ) : null}

      <label htmlFor="alias-cbu" className="flex flex-col">
        Alias CBU
        <input
          type="text"
          id="alias-cbu"
          {...register('aliasCbu')}
          aria-labelledby="alias-cbu-error"
        />
      </label>

      {errors.aliasCbu ? (
        <p className="mt-1 text-red-600" id="alias-cbu-error">
          {errors.aliasCbu.message}
        </p>
      ) : null}

      <label htmlFor="balance" className="flex flex-col">
        Balance
        <input
          type="number"
          id="balance"
          {...register('balance', { valueAsNumber: true })}
          min={1}
          aria-labelledby="balance-error"
        />
      </label>

      {errors.balance ? (
        <p className="mt-1 text-red-600" id="balance-error">
          {errors.balance.message}
        </p>
      ) : null}

      {errors.root ? (
        <p className="mt-1 self-center text-red-600" id="balance-error">
          {errors.root.message}
        </p>
      ) : null}

      {newWithdraw.isLoading ? (
        <div
          className="self-center"
          aria-label="loading"
          role="alert"
          aria-busy="true"
          aria-live="assertive"
        >
          <Spinner />
        </div>
      ) : null}

      <button
        type="submit"
        className="mt-1 w-fit self-center rounded bg-blue-600 p-2 text-white"
        disabled={newWithdraw.isLoading}
      >
        Submit
      </button>
    </form>
  );
}
