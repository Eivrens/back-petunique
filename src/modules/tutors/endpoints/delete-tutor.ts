import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class DeleteTutorsService {
  constructor(private prisma: PrismaService) {}

  async delete(id: string) {
    try {
      const tutorExists = await this.prisma.tutor.findUnique({ where: { id } });

      if (!tutorExists) {
        throw new HttpException(
          {
            message: 'Tutor não encontrado ou já deletado',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.tutor.delete({ where: { id } });

      return { message: 'Tutor deletado com sucesso' };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao deletar tutor',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
