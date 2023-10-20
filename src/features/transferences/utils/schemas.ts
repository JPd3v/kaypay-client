import { z } from 'zod';

const balanceSchema = z
  .number({ invalid_type_error: 'Expected a number' })
  .min(1, 'Balance should be at least 1')
  .max(100000, 'Maximum balance transference is 100000');

const newTransferenceSchema = z.object({
  toUser: z
    .string()
    .min(1, 'Alias is required')
    .max(30, 'Alias max length is 30 characters')
    .trim()
    .toLowerCase(),
  balance: balanceSchema,
});

type NewTransferenceType = z.infer<typeof newTransferenceSchema>;

export type { NewTransferenceType };
export { newTransferenceSchema };
