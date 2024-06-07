import { UserRoles } from '../entities/user.entity';
import {
  IsAlphanumeric,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsAlphanumeric()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  role: UserRoles;
}
