import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthEmailLoginDto {
  @IsEmail()
  email: string;

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
