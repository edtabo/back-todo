import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommonQuery {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  async find({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<number | boolean> {
    try {
      const user = await this.prisma.user.findFirst({
        select: { id: true, password: true },
        where: { email },
      });

      if (!user) return false;

      const isPasswordValid = await bcrypt.compare(password, user.password);
      return isPasswordValid ? user.id : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
