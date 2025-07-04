import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ITaskQuery, ITaskQueryParams } from '../interfaces';

@Injectable()
export class TasksQuery {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  async create({
    title,
    description,
    userId,
  }: ITaskQueryParams): Promise<ITaskQuery | null> {
    try {
      const query = await this.prisma.task.create({
        data: {
          title,
          description,
          userId,
        },
      });
      return query;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findAll(userId: number): Promise<ITaskQuery[] | null> {
    try {
      const query = await this.prisma.task.findMany({
        where: { userId },
        select: {
          createdAt: true,
          description: true,
          id: true,
          status: true,
          title: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return query;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOne(id: number, userId: number): Promise<ITaskQuery | null> {
    try {
      const query = await this.prisma.task.findUnique({
        where: {
          id,
          userId,
        },
        select: {
          createdAt: true,
          description: true,
          id: true,
          status: true,
          title: true,
        },
      });
      return query;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update({
    id,
    userId,
    description,
    title,
  }: ITaskQueryParams): Promise<ITaskQuery | null> {
    try {
      const query = await this.prisma.task.update({
        where: { id, userId },
        data: {
          description: description,
          title: title,
        },
      });
      return query;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id: number, userId: number): Promise<ITaskQuery | null> {
    try {
      const query = await this.prisma.task.delete({
        where: { id, userId },
      });
      return query;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
