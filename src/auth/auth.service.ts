import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { EmailNotFoundException } from './exceptions/email.exception';
import { InvalidPasswordException } from './exceptions/password.exception';
import { UserStatusException } from './exceptions/userStatus.exception';
import { BypassJwtAuth } from './bypass-jwt-auth.decorator';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new EmailNotFoundException();
    const checkPasswordValid = await bcrypt.compare(pass, user.password);
    if (!checkPasswordValid) {
      this.usersService.addFailedAttemptAndDisable(
        user.id,
        user.failed_attempts,
      );
      throw new InvalidPasswordException();
    }
    if (!user.is_active) throw new UserStatusException();
    const { password, ...result } = user;
    return result;
  }

  async login(user: Partial<User>) {
    const validatedUser = await this.validateUser(user.email, user.password);
    const payload: JwtPayload = {
      email: validatedUser.email,
      id: validatedUser.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async decodeToken(token: any): Promise<User> {
    const decodedToken = this.jwtService.decode(token) as any;
    if (!decodedToken) {
      throw new Error('unauthorized');
    }
    if (!decodedToken.id) {
      throw new Error('unauthorized');
    }
    const user = await this.usersService.findOneForLogin(decodedToken.id);
    return user;
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }
}
