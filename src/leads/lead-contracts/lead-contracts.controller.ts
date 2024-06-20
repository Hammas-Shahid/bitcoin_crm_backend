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
import { LeadContractsService } from './lead-contracts.service';
import { CreateLeadContractDto } from './dto/create-lead-contract.dto';
import { UpdateLeadContractDto } from './dto/update-lead-contract.dto';

@Controller('lead-contracts')
export class LeadContractsController {
  constructor(private readonly leadContractsService: LeadContractsService) {}

  @Post()
  create(
    @Body() createLeadContractDto: CreateLeadContractDto,
    @Req() req: any,
  ) {
    return this.leadContractsService.create(createLeadContractDto, req.user);
  }

  @Get()
  findAll() {
    return this.leadContractsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadContractsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLeadContractDto: UpdateLeadContractDto,
    @Req() req: any,
  ) {
    return this.leadContractsService.update(
      +id,
      updateLeadContractDto,
      req.user,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadContractsService.remove(+id);
  }
}
