import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from './common';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  user_id: number;
}
