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

import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    const user = await this.prismaService.accounts.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user)
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Email not registered',
        content: null,
        dateTime: new Date(),
      });

    const isValidPassword = passwordUtil.isMatch(
      loginDto.password,
      user.password_hash,
    );

    if (!isValidPassword)
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Incorrect password',
        content: null,
        dateTime: new Date(),
      });

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      content: {
        user: {
          ...user,
          password_hash: '',
        },
        token: await this.jwtService.signAsync(payload),
      },
      dateTime: new Date(),
    };
  }

  async register(
    authRegisterDto: AuthRegisterDto,
  ): Promise<RegisterResponseDto> {
    const isExistEmail = await this.prismaService.accounts.findUnique({
      where: {
        email: authRegisterDto.email,
      },
    });

    if (isExistEmail)
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message: 'Email is already registered',
        content: null,
        dateTime: new Date(),
      });

    await this.prismaService.accounts.create({
      data: {
        email: authRegisterDto.email,
        password_hash: passwordUtil.hash(authRegisterDto.password),
      },
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Registered successfully',
      content: null,
      dateTime: new Date(),
    };
  }
}
