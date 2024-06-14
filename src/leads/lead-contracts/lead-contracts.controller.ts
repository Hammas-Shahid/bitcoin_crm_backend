import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LeadContractsService } from './lead-contracts.service';
import { LeadContract } from './entities/lead-contract.entity';

@Controller('lead-contracts')
export class LeadContractsController {
  constructor(private readonly leadContractService: LeadContractsService) {}

  @Post()
  create(@Body() leadContractData: Partial<LeadContract>): Promise<LeadContract> {
    return this.leadContractService.create(leadContractData);
  }

  @Get()
  findAll(): Promise<LeadContract[]> {
    return this.leadContractService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<LeadContract> {
    return this.leadContractService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() leadContractData: Partial<LeadContract>): Promise<LeadContract> {
    return this.leadContractService.update(+id, leadContractData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.leadContractService.remove(+id);
  }
}
