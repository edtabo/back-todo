import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksQuery } from './queries';
import { Localizations } from '../commons/localizations';
import { IResponse } from '../commons/interfaces';

@Injectable()
export class TasksService {
  @Inject(TasksQuery)
  private readonly tasksQuery: TasksQuery;

  @Inject(Localizations)
  private readonly localizations: Localizations;

  async create(createTaskDto: CreateTaskDto, req: Request): Promise<IResponse> {
    let message = this.localizations.getErrorMessages().requestError;
    let next = true;
    try {
      const { userId } = req['user'];
      const { title, description } = createTaskDto;

      const data = await this.tasksQuery.create({
        title: title,
        description: description,
        userId: userId,
      });
      if (!data) {
        next = false;
      } else {
        message = this.localizations.getSuccessMessages().requestSuccess;
      }

      return {
        success: next,
        message,
        data,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message,
      };
    }
  }

  async findAll(req: Request): Promise<IResponse> {
    let message = this.localizations.getErrorMessages().requestError;
    try {
      const { userId } = req['user'];

      const data = await this.tasksQuery.findAll(userId);

      message = !data
        ? this.localizations.getSuccessMessages().noDataFound
        : this.localizations.getSuccessMessages().requestSuccess;

      return {
        success: true,
        message,
        data: data ? data : [],
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message,
      };
    }
  }

  async findOne(id: number, req: Request): Promise<IResponse> {
    let message = this.localizations.getErrorMessages().requestError;
    try {
      const { userId } = req['user'];

      const data = await this.tasksQuery.findOne(id, userId);
      message = !data
        ? this.localizations.getSuccessMessages().noDataFound
        : this.localizations.getSuccessMessages().requestSuccess;

      return {
        success: true,
        message,
        data: data ? data : [],
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message,
      };
    }
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    req: Request,
  ): Promise<IResponse> {
    let message = this.localizations.getErrorMessages().requestError;
    try {
      const { userId } = req['user'];
      const { title, description } = updateTaskDto;

      const data = await this.tasksQuery.update({
        description: description || '',
        id,
        title: title || '',
        userId,
      });
      message = !data
        ? this.localizations.getSuccessMessages().noDataFound
        : this.localizations.getSuccessMessages().rowUpdated;

      return {
        success: true,
        message,
        data: data ? data : [],
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message,
      };
    }
  }

  async remove(id: number, req: Request): Promise<IResponse> {
    let message = this.localizations.getErrorMessages().requestError;
    try {
      const { userId } = req['user'];
      const data = await this.tasksQuery.delete(id, userId);
      message = !data
        ? this.localizations.getSuccessMessages().noDataFound
        : this.localizations.getSuccessMessages().rowDeleted;

      return {
        success: true,
        message,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message,
      };
    }
  }
}
