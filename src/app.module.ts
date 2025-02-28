import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './api/v1/auth/auth.module';
import authConfig from './api/v1/auth/config/auth.config';
import { JwtAuthGuard } from './api/v1/auth/strategies/jwt-auth.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [appConfig, authConfig],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
