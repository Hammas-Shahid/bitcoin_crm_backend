import { IsOptional } from 'class-validator';

export class CreateLeadCallbackDto {
  @IsOptional()
  leadId: number;

  @IsOptional()
  date: string;

  @IsOptional()
  time: string;

  @IsOptional()
  comment: string;
}
