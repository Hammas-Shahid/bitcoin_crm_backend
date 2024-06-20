import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const tokenArray = req.headers.authorization;
    if (tokenArray) {
      const currentUser = await this.authService.decodeToken(
        tokenArray.split(' ')[1],
      );
      if (!currentUser.is_active) {
        req.res.status(401).send({ message: 'Unauthorized: User is disabled' });
        return of(null);
      }
      req['user'] = currentUser;
    }

    return next.handle();
  }
}
