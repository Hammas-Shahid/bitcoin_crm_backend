import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleNoteDto } from './create-sale-note.dto';

export class UpdateSaleNoteDto extends PartialType(CreateSaleNoteDto) {}
