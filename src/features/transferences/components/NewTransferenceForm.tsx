/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { Spinner } from 'components';
import {
  NewTransferenceType,
  newTransferenceSchema,
  useNewTransference,
  useTransferencesModal,
} from 'features/transferences';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import { ZodIssue } from 'zod';

export default function NewTransferenceForm() {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<NewTransferenceType>({
    mode: 'all',
    resolver: zodResolver(newTransferenceSchema),
  });

  const transference = useNewTransference();
  const transferenceModal = useTransferencesModal();

  function onSubmit(formData: NewTransferenceType) {
    transference.mutate(formData);
  }

  useEffect(() => {
    if (isAxiosError<ZodIssue[]>(transference.error)) {
      if (transference.error.response?.status === 500) {
        setError('root', { message: 'Internal Server Error' });
      }
      if (transference.error.response?.status === 400) {
        transference.error.response?.data.forEach((error) => {
          error.path.forEach((path) => {
            setError(
              path as keyof NewTransferenceType,
              {
                message: error.message,
              },
              { shouldFocus: true },
            );
          });
        });
      }
    }
  }, [transference.error, setError]);

  return (
    <form
      className="relative m-1 flex w-full max-w-sm flex-col gap-1 overflow-auto rounded bg-white p-2 sm:w-96"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h2 className="text-xl">Transference</h2>

      <button
        type="button"
        aria-label="close transference form"
        className="absolute right-0 top-0 m-1 "
        onClick={transferenceModal.close}
      >
        <AiOutlineClose />
      </button>

      <label htmlFor="user" className="flex flex-col">
        User Alias
        <input
          type="text"
          {...register('toUser')}
          id="user"
          aria-labelledby="user-error"
        />
      </label>

      {errors.toUser ? (
        <p className="mt-1 text-red-600" id="user-error">
          {errors.toUser.message}
        </p>
      ) : null}

      <label htmlFor="balance" className="flex flex-col">
        Balance
        <input
          type="number"
          {...register('balance', { valueAsNumber: true })}
          id="balance"
          min={1}
          max={100000}
          aria-labelledby="balance-error"
        />
      </label>

      {errors.balance ? (
        <p className="mt-1 text-red-600" id="balance-error">
          {errors.balance.message}
        </p>
      ) : null}

      {transference.isLoading ? (
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

      {errors.root ? (
        <p className="mt-1 self-center text-red-600">{errors.root?.message}</p>
      ) : null}

      <button
        type="submit"
        className="mt-1 w-fit self-center rounded bg-blue-600 p-2 text-white"
        disabled={transference.isLoading}
      >
        Submit
      </button>
    </form>
  );
}
