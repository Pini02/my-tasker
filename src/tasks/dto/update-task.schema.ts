import z from 'zod';

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['open', 'in_progress', 'completed']).optional(),
  user_id: z.number().optional(),
});

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
