import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { BYPASS_JWT_AUTH_KEY } from './bypass-jwt-auth.decorator';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const bypass = this.reflector.getAllAndOverride<boolean>(
      BYPASS_JWT_AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (bypass) {
      return true;
    }

    return super.canActivate(context);
  }
}
