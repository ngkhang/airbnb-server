import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/prisma/prisma.service';
import { passwordUtil } from 'src/utils/password.util';

import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

export interface User {
  id: number;
  email: string;
  password_hash: string;
  is_locked: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ResponseBase<T> {
  message: string;
  content: T;
}
export type ResponseApi<T> = Promise<{ message: string; content: T }>;

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    signInDto: SignInDto,
  ): ResponseApi<{ user: User; accessToken: string }> {
    const user = await this.prismaService.accounts.findUnique({
      where: {
        email: signInDto.email,
      },
    });

    if (!user)
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Email is not exist',
        content: null,
      });

    const isCorrectPassword = passwordUtil.isMatch(
      signInDto.password,
      user.password_hash,
    );

    if (!isCorrectPassword)
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Password is not correct',
        content: null,
      });

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      message: 'Login successfully',
      content: {
        user: {
          ...user,
          password_hash: '',
        },
        accessToken: await this.jwtService.signAsync(payload),
      },
    };
  }

  async signUp(signUpDto: SignUpDto): ResponseApi<User> {
    const isExistEmail = await this.prismaService.accounts.findUnique({
      where: {
        email: signUpDto.email,
      },
    });

    if (isExistEmail)
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message: ' Email is exist',
        content: null,
      });

    const result = await this.prismaService.accounts.create({
      data: {
        email: signUpDto.email,
        password_hash: passwordUtil.hash(signUpDto.password),
      },
    });

    return {
      message: 'Create a new account successful',
      content: { ...result, password_hash: '' },
    };
  }
}
