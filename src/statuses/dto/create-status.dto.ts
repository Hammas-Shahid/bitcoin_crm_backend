import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateStatusDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  stateId: number;
}
