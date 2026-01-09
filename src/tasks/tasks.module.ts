import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ConnectionModule } from '@app/connection';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConnectionModule, AuthModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
