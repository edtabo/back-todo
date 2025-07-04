import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import {
  IRegisterQuery,
  IRegisterQueryFindParams,
  IRegisterQueryParams,
} from '../interfaces';

@Injectable()
export class RegisterQuery {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  async create({
    email,
    password,
    fullName,
  }: IRegisterQueryParams): Promise<IRegisterQuery | null> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = await this.prisma.user.create({
        data: {
          fullName,
          email,
          password: hashedPassword,
        },
      });
      return query;
    } catch (error: any) {
      throw new Error('Error al procesar la solicitud');
    }
  }

  async find({ email }: IRegisterQueryFindParams): Promise<boolean> {
    try {
      const query = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });
      return query ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
