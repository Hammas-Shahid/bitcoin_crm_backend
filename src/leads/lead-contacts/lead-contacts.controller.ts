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

  // @Get()
  // findAll() {
  //   return this.leadContactsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.leadContactsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLeadContactDto: UpdateLeadContactDto) {
  //   return this.leadContactsService.update(+id, updateLeadContactDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.leadContactsService.remove(+id);
  // }
}
