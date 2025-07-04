import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { Localizations } from '../commons/localizations';
import { RegisterQuery } from './queries';

@Module({
  controllers: [AuthController],
  imports: [PrismaModule],
  providers: [AuthService, Localizations, RegisterQuery],
})
export class AuthModule {}
