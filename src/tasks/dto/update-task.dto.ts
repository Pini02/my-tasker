import { IsOptional } from 'class-validator';
import { TaskStatus } from './common';

export class UpdateTaskDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  status: TaskStatus;

  @IsOptional()
  user_id: number;
}
