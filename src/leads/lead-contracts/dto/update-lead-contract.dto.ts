import { PartialType } from '@nestjs/mapped-types';
import { CreateLeadContractDto } from './create-lead-contract.dto';

export class UpdateLeadContractDto extends PartialType(CreateLeadContractDto) {}
