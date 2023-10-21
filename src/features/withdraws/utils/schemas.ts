import { z } from 'zod';

const newWithdrawSchema = z.object({
  balance: z
    .number({ invalid_type_error: 'Expected a number' })
    .min(1, 'Minimum withdraw balance should be at least 1'),
  aliasCbu: z
    .string()
    .min(6, 'Alias cbu should have a minimum of 6 characters')
    .max(20, 'Alias cbu should have a maximum of 20 characters'),
  bankName: z
    .string()
    .min(1, "Bank name can't be empty")
    .max(50, 'Bank name should have a maximum of 50 characters'),
});

type NewWithdrawType = z.infer<typeof newWithdrawSchema>;

export type { NewWithdrawType };
export { newWithdrawSchema };
