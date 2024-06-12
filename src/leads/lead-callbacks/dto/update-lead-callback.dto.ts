import { PartialType } from '@nestjs/mapped-types';
import { CreateLeadCallbackDto } from './create-lead-callback.dto';

export class UpdateLeadCallbackDto extends PartialType(CreateLeadCallbackDto) {}
