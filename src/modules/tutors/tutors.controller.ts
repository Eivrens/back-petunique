import {
  Body,
  Controller,
  Param,
  Post,
  Patch
} from '@nestjs/common';
import { GetTutorsService } from './endpoints/get-tutor';
import { PostTutorsService } from './endpoints/post-tutor';
import { PutTutorsService } from './endpoints/put-tutor';
import { DeleteTutorsService } from './endpoints/delete-tutor';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('tutors')
export class TutorsController {
  constructor(
    private readonly getTutorsService: GetTutorsService,
    private readonly postTutorsService: PostTutorsService,
    private readonly putTutorsService: PutTutorsService,
    private readonly deleteTutorsService: DeleteTutorsService,
  ) {}

  @IsPublic()
  @Post('register')
  async registerTutor(@Body() data: CreateTutorDto) {
    console.log("Dados recebidos no backend:", JSON.stringify(data, null, 2)); //DEBUG
    return this.postTutorsService.createOneTutor(data);
  }

  @Patch('update')
  async updateTutor(@Param('id') id: string, @Body() data: UpdateTutorDto) {
    return this.putTutorsService.update(id, data);
  }

}
