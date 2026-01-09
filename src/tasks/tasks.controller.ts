import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ZodValidationPipe } from 'src/zod/zod.pipe';
import { type UpdateTaskDto, updateTaskSchema } from './dto/update-task.schema';
import { CurrentUser } from 'src/common/current-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { type JwtPayload } from 'src/common/IJwtPayload';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TaskQueryDTO } from './dto/task-query.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly TS: TasksService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll(@CurrentUser() user: JwtPayload) {
    if (user.role !== 'player') throw new ForbiddenException();
    return this.TS.getAll();
  }
  //validazione con pipe generica
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createTask(@Body() newTask: CreateTaskDto) {
    return this.TS.createTask(newTask);
  }
  @ApiTags('Tasks')
  @Get('myTasks')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getByUserId(@CurrentUser() user: JwtPayload, @Query() query: TaskQueryDTO) {
    return this.TS.getByUser(user.sub, query);
  }
  //Validazione con pipe generica
  @Get(':id')
  getById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.TS.getById(id);
  }
  //validazione con pipe definita tramite zod e relativo schema
  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateTaskSchema))
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() modified: UpdateTaskDto,
  ) {
    return this.TS.updateTask(id, modified);
  }
  //validazione con pipe generica
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteTask(
    @CurrentUser() user: JwtPayload,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.TS.deleteTask(user.sub, id);
  }
}
