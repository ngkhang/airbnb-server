import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { IS_SKIP_AUTH_KEY } from 'src/decorators/skip-auth.decorator';

import { JWT_STRATEGY_KEY } from '../../../../utils/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_STRATEGY_KEY) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(
      IS_SKIP_AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isSkipAuth) return true;

    return super.canActivate(context);
  }
}
