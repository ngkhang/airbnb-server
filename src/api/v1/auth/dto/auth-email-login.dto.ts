import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@ApiSchema({
  name: 'Login',
  description: '',
})
export class AuthEmailLoginDto {
  @ApiProperty({
    description: 'The email of the user',
    type: 'string',
    example: 'user1@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    type: 'string',
    example: 'User@1234',
    required: true,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  @Matches(/(?=.*[a-z])/g, {
    message: 'Password must container a lowercase character',
  })
  @Matches(/(?=.*[A-Z])/g, {
    message: 'Password must container a uppercase character',
  })
  @Matches(/(?=.*\d+)/g, {
    message: 'Password must container a numerous',
  })
  @Matches(/(?=.*\W+)/g, {
    message: 'Password must container a specify character',
  })
  password: string;
}
