import { IsOptional, IsEmail } from 'class-validator';
import { CreateContactDto } from 'src/contacts/dto/create-contact.dto';

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
  statusId: number;

  @IsOptional()
  leadContacts: CreateContactDto[];
}
