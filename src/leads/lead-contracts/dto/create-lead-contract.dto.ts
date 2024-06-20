import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLeadContractDto {
  @IsString()
  rate: string;

  @IsNumber()
  durationInDays: number;

  @IsString()
  signedDate: string;

  @IsString()
  scheduleDate: string;

  @IsString()
  installationDate: string;

  @IsNumber()
  leadId: number;

  @IsNumber()
  @IsOptional()
  serviceProviderId?: number;
}
