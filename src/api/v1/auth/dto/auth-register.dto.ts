import { IsEnum } from 'class-validator';

import { AuthEmailLoginDto } from './auth-email-login.dto';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class AuthRegisterDto extends AuthEmailLoginDto {
  @IsEnum(UserRole)
  role: string;
}
