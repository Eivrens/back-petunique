import { Module } from '@nestjs/common';
import { PetsModule } from './modules/pets/pets.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { TutorsModule } from './modules/tutors/tutors.module';

@Module({
  imports: [PetsModule, TutorsModule, AuthModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
