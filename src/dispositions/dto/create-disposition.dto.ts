import { IsString } from 'class-validator';

export class CreateDispositionDto {
  @IsString()
  name: string;
}
