/* eslint-disable react/jsx-props-no-spreading */
import {
  FormDepositType,
  depositSchema,
  useDepositsModal,
  useNewDeposit,
} from 'features/deposits';
import { AiOutlineClose } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from 'features/auth';
import { Spinner } from 'components';
import { useEffect } from 'react';
import { isAxiosError } from 'axios';
import { ZodIssue } from 'zod';

export default function NewDepositForm() {
  const depositModal = useDepositsModal();
  const user = useAuth().data;
  const newDeposit = useNewDeposit();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormDepositType>({
    mode: 'all',
    resolver: zodResolver(depositSchema),
  });

  function onSubmit({ balance }: FormDepositType) {
    if (!user?.id) {
      return;
    }
    newDeposit.mutate({ balance, id: user?.id });
  }

  useEffect(() => {
    if (isAxiosError<ZodIssue[]>(newDeposit.error)) {
      if (newDeposit.error.response?.status === 500) {
        setError('root', { message: 'Internal Server Error' });
      } else {
        newDeposit.error.response?.data.forEach((error) => {
          error.path.forEach((path) => {
            setError(
              path as keyof FormDepositType,
              { message: error.message },
              { shouldFocus: true },
            );
          });
        });
      }
    }
  }, [setError, newDeposit.error]);

  return (
    <form
      className="relative m-1 flex w-full max-w-sm flex-col gap-1 overflow-auto rounded bg-white p-2 sm:w-96"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h2>New Deposit</h2>
      <button
        type="button"
        aria-label="close new deposit form"
        className="absolute right-0 top-0 m-1 "
        onClick={depositModal.close}
      >
        <AiOutlineClose />
      </button>
      <label htmlFor="balance" className="flex flex-col ">
        Balance
        <input
          type="number"
          {...register('balance', { valueAsNumber: true })}
          min={1}
          max={100000}
          id="balance"
          defaultValue={1}
          aria-invalid={errors.balance ? 'true' : 'false'}
          aria-labelledby="balance-error"
        />
      </label>

      {errors.balance ? (
        <p className="mt-1 text-red-600" id="balance-error">
          {errors.balance.message}
        </p>
      ) : null}

      {newDeposit.isLoading ? (
        <div className="self-center" aria-label="loading">
          <Spinner />
        </div>
      ) : null}

      <button
        type="submit"
        className="mt-1 w-fit self-center rounded bg-blue-600 p-2 text-white"
        disabled={newDeposit.isLoading}
      >
        Submit
      </button>
    </form>
  );
}
