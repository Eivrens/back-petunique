import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { GetTutorsService } from 'src/modules/tutors/endpoints/get-tutor';
import * as bcrypt from 'bcrypt';
import { Tutor } from '@prisma/client';
import { UserPayload } from './entities/user.payload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './entities/user.token';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly getTutorsService: GetTutorsService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: Tutor): UserToken {
    const userPayload: UserPayload = {
      sub: user.id,
      fullName: user.fullName,
      email: user.email
    };

    const jwtToken = this.jwtService.sign(userPayload);

    return {
      accessToken: jwtToken,
    };
  }

  async validateUser(username: string, password: string) {
    const userExists = await this.getTutorsService.findLoginUser(username);
    if (userExists) {
      const passwordValid = await bcrypt.compare(password, userExists.password);
      if (passwordValid) {
        return this.getTutorsService.findOneUser(userExists.id);
      }
    }
    throw new HttpException(
      {
        message: 'Email ou senha incorretos',
        status: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
