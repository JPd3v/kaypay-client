import { z } from 'zod';

const depositSchema = z.object({
  balance: z
    .number()
    .min(1, 'balance should be at least 1')
    .max(100000, 'maximum balance deposit is 100000'),
});

type FormDepositType = z.infer<typeof depositSchema>;

export type { FormDepositType };
export { depositSchema };
