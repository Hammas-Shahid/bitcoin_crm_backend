import { IsOptional, IsString } from 'class-validator';

export class CreateBusinessTypeDto {
  @IsOptional()
  @IsString()
  name: string;
}
