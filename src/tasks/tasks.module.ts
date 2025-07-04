import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TasksQuery } from './queries';
import { Localizations } from '../commons/localizations';

@Module({
  controllers: [TasksController],
  imports: [PrismaModule],
  providers: [TasksService, TasksQuery, Localizations],
})
export class TasksModule {}
