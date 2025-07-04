import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    return this.tasksService.create(createTaskDto, req);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.tasksService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.tasksService.findOne(+id, req);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request,
  ) {
    return this.tasksService.update(+id, updateTaskDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.tasksService.remove(+id, req);
  }
}
