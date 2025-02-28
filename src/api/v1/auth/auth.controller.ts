import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { SkipAuth } from 'src/decorators/skip-auth.decorator';

import { AuthService } from './auth.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@ApiTags('Auth')
@SkipAuth()
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login with email' })
  @ApiBody({ type: AuthEmailLoginDto })
  @ApiOkResponse({
    description: 'Success',
    example: {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      content: {
        user: {
          id: 1,
          email: 'user1@gmail.com',
          password_hash: '',
          is_locked: false,
          created_at: '2025-02-18T10:15:29.000Z',
          updated_at: '2025-02-25T12:17:11.000Z',
        },
        token: 'TOKEN',
      },
      dateTime: '2025-02-26T07:10:27.791Z',
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Incorrect password',
      content: null,
      dateTime: '2025-02-26T07:10:27.791Z',
    },
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Email not registered',
      content: null,
      dateTime: '2025-02-26T07:10:27.791Z',
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('email/login')
  async login(@Body() loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Create a new account' })
  @ApiBody({ type: AuthRegisterDto })
  @ApiCreatedResponse({
    description: 'Success',
    example: {
      statusCode: HttpStatus.CREATED,
      message: 'Registered successfully',
      content: null,
      dateTime: '2025-02-26T07:10:27.791Z',
    },
  })
  @ApiConflictResponse({
    description: 'Email is already registered',
    example: {
      statusCode: HttpStatus.CONFLICT,
      message: 'Email is already registered',
      content: null,
      dateTime: '2025-02-26T07:10:27.791Z',
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('email/register')
  async register(
    @Body() registerDto: AuthRegisterDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(registerDto);
  }
}
