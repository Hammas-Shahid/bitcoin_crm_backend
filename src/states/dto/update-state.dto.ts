import { IsString, IsOptional } from 'class-validator';

export class UpdateStateDto {
  @IsOptional()
  @IsString()
  name?: string;
}
