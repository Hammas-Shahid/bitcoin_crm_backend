import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateLeadContactDto {
  @IsOptional()
  @IsNumber()
  leadId: number;

  @IsOptional()
  @IsNumber()
  contactId: number;
}
