import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { APP_GUARD } from '@nestjs/core';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { Localizations } from './commons/localizations';
import { CommonQuery } from './commons/queries';

@Module({
  imports: [AuthModule, PrismaModule, TasksModule],
  controllers: [],
  providers: [
    Localizations,
    CommonQuery,
    {
      provide: APP_GUARD,
      useClass: FirebaseAuthGuard,
    },
  ],
})
export class AppModule {}
