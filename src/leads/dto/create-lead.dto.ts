import { IsOptional, IsEmail } from 'class-validator';

export class CreateLeadDto {
  @IsOptional()
  businessName: string;

  @IsOptional()
  businessTypeId: number;

  @IsOptional()
  address: string;

  @IsOptional()
  city: string;

  @IsOptional()
  state: string;

  @IsOptional()
  zipCode: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  assigneeId: number;

  @IsOptional()
  legalName: string;

  @IsOptional()
  legalType: string;

  @IsOptional()
  statusId: number;
}
