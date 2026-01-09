import { Tasks } from '@app/connection/tasks/tasks.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.schema';
import { TaskQueryDTO } from './dto/task-query.dto';
import { WhereByUserId } from './types/task-where';

@Injectable()
export class TasksService {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly ds: DataSource,
  ) {}

  getAll() {
    return this.ds.getRepository(Tasks).find();
  }
  getById(id: number) {
    return this.ds.getRepository(Tasks).find({
      where: {
        id: id,
      },
    });
  }
  async getByUser(userId: number, query: TaskQueryDTO) {
    const { sortOrder, sortField, status, page = 1, limit = 10 } = query;
    const where: WhereByUserId = {
      user: { id: userId },
    };
    const sort = {};

    if (status) {
      where.status = status;
    }
    if (sortOrder && sortField) {
      sort[sortField] = sortOrder;
    }
    const [data, total] = await this.ds.getRepository(Tasks).findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: {
        ...sort,
      },
    });
    return {
      data,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }
  async createTask(task: CreateTaskDto) {
    const date = new Date();
    const created_at = `${date.getFullYear()}-${date.getDate()}-${date.getMonth() + 1}`;
    const datedTask = {
      ...task,
      created_at: created_at,
      updated_at: created_at,
    };
    return await this.ds.getRepository(Tasks).insert(datedTask);
  }
  updateTask(id: number, task: UpdateTaskDto) {
    const date = new Date();
    const updated_at: string = `${date.getFullYear()}-${date.getDate()}-${date.getMonth() + 1}`;
    const datedTask = {
      ...task,
      updated_at: updated_at,
    };
    return this.ds.getRepository(Tasks).update(id, datedTask);
  }
  async deleteTask(userId: number, taskId: number) {
    const res = await this.ds
      .getRepository(Tasks)
      .delete({ id: taskId, user_id: userId });
    if (res?.affected === 0) {
      throw new NotFoundException();
    }
  }
}
