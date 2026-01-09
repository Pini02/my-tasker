import z from 'zod';

export const createUserSchema = z.object({
  email: z.email(),
  password: z.string(),
  role: z.string(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
