import { IsArray, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsArray()
  phoneNumbers: string[];

  @IsOptional()
  @IsArray()
  emailAddresses: string[];

  @IsOptional()
  notes: string;
}
