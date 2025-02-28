import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AllConfigType, configKey } from 'src/config/config.type';
import { JWT_STRATEGY_KEY } from 'src/utils/constants';

import { JwtPayloadType, JwtPayloadValidType } from './types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_KEY) {
  constructor(configService: ConfigService<AllConfigType>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow(configKey.auth, { infer: true })
        .jwtSecret,
    });
  }

  public validate(payload: JwtPayloadValidType): JwtPayloadType {
    return { userId: payload.userId, email: payload.email };
  }
}
