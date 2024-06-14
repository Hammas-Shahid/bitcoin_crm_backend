import { IsEnum, IsOptional, IsString } from 'class-validator';
import { NoteTypes } from '../entities/note.entity';

export class CreateNoteDto {
  @IsString()
  note: string;

  @IsOptional()
  leadId: number;

  @IsOptional()
  leadCallId: number;

  @IsOptional()
  leadCallBackId: number;

  @IsString()
  @IsEnum(NoteTypes)
  type: NoteTypes;
}
