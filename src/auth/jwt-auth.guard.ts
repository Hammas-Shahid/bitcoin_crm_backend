import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { BYPASS_JWT_AUTH_KEY } from './bypass-jwt-auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const bypassJwtAuth = this.reflector.getAllAndOverride<boolean>(
      BYPASS_JWT_AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (bypassJwtAuth) {
      return true;
    }
    return super.canActivate(context);
  }
}
