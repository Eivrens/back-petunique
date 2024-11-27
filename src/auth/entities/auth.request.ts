import { Request } from 'express';
import { Tutor } from '@prisma/client';

export interface AuthRequest extends Request {
  user: Tutor;
}
