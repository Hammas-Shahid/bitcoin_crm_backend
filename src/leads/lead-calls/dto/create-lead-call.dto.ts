import { IsOptional } from 'class-validator';

export class CreateLeadCallDto {
  @IsOptional()
  leadId: number;

  @IsOptional()
  dispositionId: number;

  @IsOptional()
  duration: string;

  @IsOptional()
  comment: string;
}
