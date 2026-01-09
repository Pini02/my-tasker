import { User } from '@app/connection/users/users.entity';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.schema';
import { UpdateUserDto } from './dto/update-user.schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {}

  findAll() {
    return this.dataSource.getRepository(User).find();
  }

  findById(id: number) {
    return this.dataSource.getRepository(User).find({
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string) {
    const users = await this.dataSource.getRepository(User).find({
      where: {
        email: email,
      },
    });
    return users[0];
  }

  async createUser(newUser: CreateUserDto) {
    return await this.dataSource.getRepository(User).insert(newUser);
  }

  updateUser(id: number, modified: UpdateUserDto) {
    return this.dataSource.getRepository(User).update(id, modified);
  }

  deleteUser(id: number) {
    return this.dataSource.getRepository(User).delete({ id: id });
  }
}
