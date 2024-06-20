import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BypassJwtAuth } from './auth/bypass-jwt-auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @BypassJwtAuth()
  @Get()
  getHello(): string {
    return this.appService.getServerStatus();
  }
}
