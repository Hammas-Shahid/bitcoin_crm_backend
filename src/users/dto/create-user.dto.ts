import { UserRoles } from '../entities/user.entity';
import { IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  role: UserRoles;
}
