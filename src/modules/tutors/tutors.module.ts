import { Module } from '@nestjs/common';
import { GetTutorsService } from './endpoints/get-tutor';
import { PostTutorsService } from './endpoints/post-tutor';
import { PutTutorsService } from './endpoints/put-tutor';
import { DeleteTutorsService } from './endpoints/delete-tutor';
import { TutorsController } from './tutors.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [TutorsController],
  providers: [
    PrismaService,
    GetTutorsService,
    PostTutorsService,
    PutTutorsService,
    DeleteTutorsService,
  ],
  exports: [GetTutorsService],
})
export class TutorsModule {}
