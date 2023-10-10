/* eslint-disable react/jsx-props-no-spreading */
import {
  LogInType,
  logInSchema,
  useLogInForm,
  useLogInUser,
  useSignUpForm,
} from 'features/auth';
import { AiOutlineClose } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CgSpinner } from 'react-icons/cg';
import { isAxiosError } from 'axios';
import { ZodIssue } from 'zod';

export default function LogInForm() {
  const signUpForm = useSignUpForm();
  const logInForm = useLogInForm();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInType>({
    mode: 'onChange',
    resolver: zodResolver(logInSchema),
  });

  const logInUser = useLogInUser();

  function openSignUpFormForm() {
    logInForm.close();
    signUpForm.open();
  }

  function onSubmit(formData: LogInType) {
    logInUser.mutate(formData);
  }

  useEffect(() => {
    if (isAxiosError<{ error: string }>(logInUser.error)) {
      if (logInUser.error.response?.status === 500) {
        setError('root', { message: 'Internal server error' });
      } else {
        setError('root', { message: logInUser.error.response?.data.error });
      }
    }
  }, [setError, logInUser.error]);

  return (
    <form
      className="relative m-1 flex w-full max-w-sm flex-col gap-1 overflow-auto rounded bg-white p-2 sm:w-96"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h2 className="text-xl">Log in</h2>
      <button
        type="button"
        aria-label="close log in form"
        className="absolute right-0 top-0 m-1 "
        onClick={logInForm.close}
      >
        <AiOutlineClose />
      </button>

      <label htmlFor="email" className="flex flex-col">
        Email
        <input
          type="email"
          id="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-labelledby="email-error"
        />
      </label>

      {errors.email ? (
        <p className="mt-1 text-red-600" id="email-error">
          {errors.email.message}
        </p>
      ) : null}

      <label htmlFor="password" className="flex flex-col">
        Password
        <input
          type="password"
          id="password"
          {...register('password')}
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-labelledby="password-error"
        />
      </label>

      {errors.password ? (
        <p className="mt-1 text-red-600" id="password-error">
          {errors.password.message}
        </p>
      ) : null}

      <button
        type="button"
        className="w-fit font-medium text-blue-600"
        onClick={openSignUpFormForm}
      >
        I don&#39;t have an account.
      </button>

      {errors.root ? (
        <p
          className="self-center text-red-600"
          id="password-error"
          role="alert"
        >
          {errors.root.message}
        </p>
      ) : null}

      {logInUser.isLoading ? (
        <div className="self-center">
          <CgSpinner className="animate-spin text-3xl text-blue-600" />
        </div>
      ) : null}

      <button
        type="submit"
        className="mt-1 w-fit self-center rounded bg-blue-600 p-2 text-white"
      >
        Submit
      </button>
    </form>
  );
}
