import { IsString, IsOptional } from 'class-validator';

export class UpdateDispositionDto {
  @IsOptional()
  @IsString()
  name?: string;
}
