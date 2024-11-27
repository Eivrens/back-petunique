import { $Enums } from '@prisma/client';
import { InputJsonObject } from '@prisma/client/runtime/library';

export class Tutor {
    id?: string;
    cpfCnpj: string;
    fullName: string;
    dtBirth: Date;
    gender: $Enums.Gender;
    address: InputJsonObject;
    phone: string;
    email: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Address {
    street: string;
    number: number;
    complement?: string
    district: string;
    city: string;
    state: string;
    zip: string;
}
