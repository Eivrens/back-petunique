import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UpdateTutorDto } from '../dto/update-tutor.dto';

@Injectable()
export class PutTutorsService {
  constructor(private prisma: PrismaService) {}

  async update(id: string, data: UpdateTutorDto) {
    try {
      const tutorExists = await this.prisma.tutor.findUnique({ where: { id } });

      if (!tutorExists) {
        throw new HttpException(
          {
            message: `${data.fullName} não encontrado`,
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedTutor = await this.prisma.tutor.update({
        data,
        where: { id },
      });

      return {
        message: `${data.fullName} atualizado com sucesso`,
        tutor: updatedTutor,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Erro ao atualizar ${data.fullName}`,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
