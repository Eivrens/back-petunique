import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateTutorDto } from '../dto/create-tutor.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PostTutorsService {
  constructor(private prisma: PrismaService) {}

  async createOneTutor(data: CreateTutorDto) {
    try {
      const tutorExists = await this.prisma.tutor.findFirst({
        where: {
          OR: [
            { cpfCnpj: data.cpfCnpj },
            { phone: data.phone },
            { email: data.email },
          ],
        },
      });

      if (tutorExists) {
        throw new HttpException(
          {
            message: `${data.fullName} já está cadastrado`,
            status: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      }

      const createdTutor = await this.prisma.tutor.create({
        data: {
          cpfCnpj: data.cpfCnpj,
          fullName: data.fullName,
          dtBirth: new Date(data.dtBirth),
          gender: data.gender,
          address: data.address,
          phone: data.phone,
          email: data.email.toLowerCase(),
        },
      });

      const passwordHashing = await bcrypt.hash(data.password, 10);

      await this.prisma.login.create({ 
        data: {
          userId: createdTutor.id,
          username: data.email,
          account_type: "TUTOR",
          password: passwordHashing
      } });

      return {
        message: `${data.fullName} cadastrado com sucesso`,
        tutor: createdTutor,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Erro ao cadastrar ${data.fullName}`,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
