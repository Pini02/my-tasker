import z from 'zod';

export const updateUserSchema = z.object({
  email: z.email().optional(),
  password: z.string().optional(),
  role: z.string().optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
