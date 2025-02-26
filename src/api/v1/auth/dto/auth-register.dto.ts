import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { AuthEmailLoginDto } from './auth-email-login.dto';

export enum UserRole {
  USER = 1,
  ADMIN = 2,
}

@ApiSchema({
  name: 'Register',
  description: '',
})
export class AuthRegisterDto extends AuthEmailLoginDto {
  @ApiProperty({
    description: 'The User"s role',
    type: 'string',
    example: 'USER',
    required: true,
  })
  @IsEnum(UserRole)
  role: string;
}
