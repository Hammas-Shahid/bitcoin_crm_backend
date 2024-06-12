import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeadCallbacksService } from './lead-callbacks.service';
import { CreateLeadCallbackDto } from './dto/create-lead-callback.dto';
import { UpdateLeadCallbackDto } from './dto/update-lead-callback.dto';

@Controller('lead-callbacks')
export class LeadCallbacksController {
  constructor(private readonly leadCallbacksService: LeadCallbacksService) {}

  @Post()
  create(@Body() createLeadCallbackDto: CreateLeadCallbackDto) {
    return this.leadCallbacksService.create(createLeadCallbackDto);
  }

  @Get()
  findAll() {
    return this.leadCallbacksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadCallbacksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadCallbackDto: UpdateLeadCallbackDto) {
    return this.leadCallbacksService.update(+id, updateLeadCallbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadCallbacksService.remove(+id);
  }
}
