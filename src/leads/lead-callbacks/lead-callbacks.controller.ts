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
import { LeadCallbacksService } from './lead-callbacks.service';
import { CreateLeadCallbackDto } from './dto/create-lead-callback.dto';
import { UpdateLeadCallbackDto } from './dto/update-lead-callback.dto';

@Controller('lead-callbacks')
export class LeadCallbacksController {
  constructor(private readonly leadCallbacksService: LeadCallbacksService) {}

  @Post()
  create(
    @Body() createLeadCallbackDto: CreateLeadCallbackDto,
    @Req() req: any,
  ) {
    return this.leadCallbacksService.create(createLeadCallbackDto, req.user);
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
  update(
    @Param('id') id: string,
    @Body() updateLeadCallbackDto: UpdateLeadCallbackDto,
  ) {
    return this.leadCallbacksService.update(+id, updateLeadCallbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadCallbacksService.remove(+id);
  }
}
