import { IsEnum, IsString } from 'class-validator';
import { NoteTypes } from '../entities/note.entity';

export class CreateNoteDto {
  @IsString()
  note: string;

  @IsString()
  @IsEnum(NoteTypes)
  type: NoteTypes;
}
