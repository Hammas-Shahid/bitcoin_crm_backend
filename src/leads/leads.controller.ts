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
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() createLeadDto: CreateLeadDto, @Req() req: any) {
    return this.leadsService.create(createLeadDto, req.user);
  }

  @Get()
  findAll() {
    return this.leadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(+id);
  }

  @Post('paginated-leads')
  getPaginatedLeads(@Body() body: { pageIndex: number; limit: number }) {
    return this.leadsService.getPaginatedLeads(body.pageIndex, body.limit);
  }
  
  @Post('paginated-unassigned-leads')
  getPaginatedUnassignedLeads(@Body() body: { pageIndex: number; limit: number }) {
    return this.leadsService.getPaginatedUnassignedLeads(body.pageIndex, body.limit);
  }
  
  @Post('paginated-assigned-leads')
  getPaginatedAssignedLeads(@Body() body: { pageIndex: number; limit: number }) {
    return this.leadsService.getPaginatedAssignedLeads(body.pageIndex, body.limit);
  }

  @Patch(':leadId/assignee/:assigneeId')
  updateLeadAssignee(
    @Param('leadId') leadId: string,
    @Param('assigneeId') assigneeId: string,
    @Req() req: any
  ) {
    return this.leadsService.updateLeadAssignee(+leadId, +assigneeId, req.user);
  }
  
  @Patch(':leadId/status/:statusId')
  updateLeadStatus(
    @Param('leadId') leadId: string,
    @Param('statusId') statusId: string,
    @Req() req: any
  ) {
    return this.leadsService.updateLeadStatus(+leadId, +statusId, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto, @Req() req: any) {
    return this.leadsService.update(+id, updateLeadDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadsService.remove(+id);
  }

  @Post('address-exists')
  addressExists(@Body() body: { address: string }) {
    return this.leadsService.addressExists(body.address);
  }
}
