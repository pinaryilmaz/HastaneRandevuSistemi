import { z } from 'zod';
import type { TFunction } from 'i18next';

export function createLoginSchema(t: TFunction) {
  return z.object({
    email: z.string().min(1, t('login.emailRequired')).email(t('login.emailInvalid')),
    password: z.string().min(6, t('login.passwordMin')),
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
