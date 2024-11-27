import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class GetTutorsService {
  constructor(private prisma: PrismaService) {}

  async findOneUser(id: string) {
    try {
      const user = await this.prisma.tutor.findUnique({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao buscar usuário',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findLoginUser(username: string) {
    try {
      const user = await this.prisma.login.findUnique({
        where: {
          username
        },
      });

      return user;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao buscar usuário',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
