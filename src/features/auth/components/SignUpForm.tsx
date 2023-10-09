/* eslint-disable react/jsx-props-no-spreading */
import { useLogInForm, useSignUpForm, useSignUpUser } from 'features/auth';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpType, signUpSchema } from 'features/auth/utils/schemas';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { ZodIssue } from 'zod';
import { CgSpinner } from 'react-icons/cg';

export default function SignUpForm() {
  const logInForm = useLogInForm();
  const signUpForm = useSignUpForm();

  const signUp = useSignUpUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpType>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  function openLogInForm() {
    signUpForm.close();
    logInForm.open();
  }

  function onSubmit(formData: SignUpType) {
    signUp.mutate(formData);
  }

  useEffect(() => {
    if (isAxiosError<ZodIssue[]>(signUp.error)) {
      if (signUp.error.response?.status === 500) {
        setError('root', { message: 'Internal server error' });
      } else {
        signUp.error.response?.data?.forEach((error) => {
          error.path.forEach((path) => {
            setError(
              path as keyof SignUpType,
              { message: error.message },
              { shouldFocus: true },
            );
          });
        });
      }
    }
  }, [setError, signUp.error]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative m-1 flex w-full max-w-sm flex-col gap-1 overflow-auto rounded bg-white p-2 sm:w-96 "
      noValidate
    >
      <h2 className="text-xl">Sign up</h2>
      <button
        type="button"
        aria-label="close sign up form"
        className="absolute right-0 top-0 m-1"
        onClick={signUpForm.close}
      >
        <AiOutlineClose />
      </button>
      <button
        type="button"
        className="w-fit font-medium text-blue-600"
        onClick={openLogInForm}
      >
        I already have an account.
      </button>

      <label htmlFor="first-name" className="flex flex-col">
        First Name
        <input
          type="text"
          id="first-name"
          aria-invalid={errors.firstName ? 'true' : 'false'}
          aria-labelledby="first-name-error"
          {...register('firstName')}
        />
      </label>

      {errors.firstName ? (
        <p className="mt-2 text-red-600" id="first-name-error">
          {errors.firstName?.message}
        </p>
      ) : null}

      <label htmlFor="last-name" className="flex flex-col">
        Last Name
        <input
          type="text"
          id="last-name"
          {...register('lastName')}
          aria-invalid={errors.lastName ? 'true' : 'false'}
          aria-labelledby="last-name-error"
        />
      </label>
      {errors.lastName ? (
        <p className="mt-2 text-red-600" id="last-name-error">
          {errors.lastName?.message}
        </p>
      ) : null}

      <label htmlFor="alias" className="flex flex-col">
        Alias
        <input
          type="text"
          id="alias"
          {...register('alias')}
          aria-invalid={errors.alias ? 'true' : 'false'}
          aria-labelledby="alias-error"
        />
      </label>

      {errors.alias ? (
        <p className="mt-2 text-red-600" id="alias-error">
          {errors.alias?.message}
        </p>
      ) : null}

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
        <p className="mt-2 text-red-600" id="email-error">
          {errors.email?.message}
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
        <p className="mt-2 text-red-600" id="password-error">
          {errors.password?.message}
        </p>
      ) : null}

      <label htmlFor="confirm-password" className="flex flex-col">
        Confirm Password
        <input
          type="password"
          id="confirm-password"
          {...register('confirmPassword')}
          aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          aria-labelledby="confirm-password-error"
        />
      </label>

      {errors.confirmPassword ? (
        <p className="mt-2 text-red-600" id="confirm-password-error">
          {errors.confirmPassword?.message}
        </p>
      ) : null}

      {errors.root ? (
        <p className="mt-2 text-red-600" role="alert">
          {errors.root?.message}
        </p>
      ) : null}

      {signUp.isLoading ? (
        <div className="self-center">
          <CgSpinner className="animate-spin text-3xl text-blue-600" />
        </div>
      ) : null}

      <button
        type="submit"
        className="mt-1 w-fit self-center rounded bg-blue-600 p-1 text-white "
        disabled={signUp.isLoading}
      >
        Submit
      </button>
    </form>
  );
}
