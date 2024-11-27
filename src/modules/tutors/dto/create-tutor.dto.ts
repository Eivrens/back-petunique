import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  ValidateNested,
  IsUUID,
  IsDate,
  Length,
  IsIn,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Address, Tutor } from '../entities/tutor.entity';
import { $Enums } from '@prisma/client';
import { InputJsonObject } from '@prisma/client/runtime/library';

export class CreateTutorDto extends Tutor {
  id?: string;

  @IsString()
  @Length(11, 14)
  cpfCnpj: string;

  @IsString()
  @Length(4, 50)
  fullName: string;

  @IsDateString()
  dtBirth: Date;

  @IsIn(['M', 'F'])
  gender: $Enums.Gender;

  @Length(11, 11)
  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message:
      'A senha deve conter entre 8 a 16 caracteres e ter pelo menos uma letra e um número',
  })
  password: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: InputJsonObject;
}

export class AddressDto implements Address {
  @IsString()
  street: string;

  @IsNumber()
  number: number;

  @IsString()
  complement?: string;

  @IsString()
  district: string;

  @IsString()
  city: string;
  
  @IsString()
  @Length(2, 2)
  state: string;

  @IsString()
  @Length(8, 8)
  zip: string;
}
