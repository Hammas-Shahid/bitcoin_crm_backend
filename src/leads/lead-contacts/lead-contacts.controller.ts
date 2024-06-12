import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateLeadContactDto } from './dto/create-lead-contact.dto';
import { UpdateLeadContactDto } from './dto/update-lead-contact.dto';
import { LeadContactsService } from './lead-contacts.service';

@Controller('lead-contacts')
export class LeadContactsController {
  constructor(private readonly leadContactsService: LeadContactsService) {}

  @Post()
  create(@Body() createLeadContactDto: CreateLeadContactDto) {
    return this.leadContactsService.create(createLeadContactDto);
  }

  @Get(':leadId/:contactId')
  findOne(
    @Param('leadId') leadId: string,
    @Param('contactId') contactId: string,
  ) {
    return this.leadContactsService.findOneByLeadAndContact(
      +leadId,
      +contactId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadContactsService.remove(+id);
  }
}
