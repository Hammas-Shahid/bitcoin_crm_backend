import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { BypassJwtAuth } from './bypass-jwt-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @BypassJwtAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.body);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Req() req: any) {
    return this.authService.register(createUserDto, req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
