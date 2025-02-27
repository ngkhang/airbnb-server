import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AllConfigType, configKey } from 'src/config/config.type';
import { PrismaModule } from 'src/prisma/prisma.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<AllConfigType>) => {
        const { jwtSecret, jwtExpires } = configService.getOrThrow(
          configKey.auth,
          {
            infer: true,
          },
        );
        return {
          // global: true,
          secret: jwtSecret,
          signOptions: {
            expiresIn: jwtExpires,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
