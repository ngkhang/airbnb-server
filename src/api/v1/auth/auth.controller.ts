import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('email/login')
  async login(@Body() loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(loginDto);
  }

  @Post('email/register')
  async register(
    @Body() registerDto: AuthRegisterDto,
  ): Promise<RegisterResponseDto> {
    return await this.authService.register(registerDto);
  }
}
