import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { LeadCallsService } from './lead-calls.service';
import { CreateLeadCallDto } from './dto/create-lead-call.dto';
import { UpdateLeadCallDto } from './dto/update-lead-call.dto';

@Controller('lead-calls')
export class LeadCallsController {
  constructor(private readonly leadCallsService: LeadCallsService) {}

  @Post()
  create(@Body() createLeadCallDto: CreateLeadCallDto, @Req() req: any) {
    return this.leadCallsService.create(createLeadCallDto, req.user);
  }

  @Get()
  findAll() {
    return this.leadCallsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadCallsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLeadCallDto: UpdateLeadCallDto,
    @Req() req: any,
  ) {
    return this.leadCallsService.update(+id, updateLeadCallDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadCallsService.remove(+id);
  }
}
