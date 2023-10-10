import { z } from 'zod';

const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'First name is required')
      .max(20, 'First name max length is 20 characters')
      .trim()
      .toLowerCase(),
    lastName: z
      .string()
      .min(1, 'Last name is required')
      .max(20, 'Last name max length is 20 characters')
      .trim()
      .toLowerCase(),
    alias: z
      .string()
      .min(1, 'Alias is required')
      .max(30, 'Alias max length is 30 characters')
      .trim()
      .toLowerCase(),
    email: z
      .string()
      .min(1, 'Email is required')
      .max(50, 'Email max length is 50 characters')
      .email()
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(8, 'password min length is 8 characters')
      .max(30, 'Password max length is 30 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm password min length is 8 characters')
      .max(30, 'Confirm password max length is 30 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password don't match",
    path: ['confirmPassword'],
  });

const logInSchema = z.object({
  email: z
    .string()
    .email('Invalid email')
    .min(1, 'Email is required')
    .max(50, 'Email max length is 50 characters'),
  password: z
    .string()
    .min(8, 'Password min length is 8 characters')
    .max(30, 'Password max length is 30 characters'),
});

type SignUpType = z.infer<typeof signUpSchema>;
type LogInType = z.infer<typeof logInSchema>;

export { signUpSchema, logInSchema };
export type { SignUpType, LogInType };
