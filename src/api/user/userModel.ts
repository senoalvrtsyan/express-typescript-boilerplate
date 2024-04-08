import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

// Input Validation for 'GET users/:id' endpoint
export const GetOrDeleteUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

// Input Validation for 'GET users/:id' endpoint
export const AddUserSchema = z.object({
  body: z.object({
    name: z.string(),
    email: commonValidations.email,
    age: z.number(),
  }),
});
