import { PartialType } from '@nestjs/mapped-types';
import { CreateLeadCallDto } from './create-lead-call.dto';

export class UpdateLeadCallDto extends PartialType(CreateLeadCallDto) {}
