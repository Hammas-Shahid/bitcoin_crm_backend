import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLeadNoteDto {
  @IsOptional()
  leadId: number;

  @IsString()
  content: string;
}
