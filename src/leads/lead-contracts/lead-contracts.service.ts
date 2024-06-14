import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadContract } from './entities/lead-contract.entity';

@Injectable()
export class LeadContractsService {
  constructor(
    @InjectRepository(LeadContract)
    private readonly leadContractRepository: Repository<LeadContract>,
  ) {}

  async create(leadContractData: Partial<LeadContract>): Promise<LeadContract> {
    const leadContract = this.leadContractRepository.create(leadContractData);
    return await this.leadContractRepository.save(leadContract);
  }

  async findAll(): Promise<LeadContract[]> {
    return await this.leadContractRepository.find();
  }

  async findOne(id: number): Promise<LeadContract> {
    return await this.leadContractRepository.findOne({where: {id}});
  }

  async update(id: number, leadContractData: Partial<LeadContract>): Promise<LeadContract> {
    await this.leadContractRepository.update(id, leadContractData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.leadContractRepository.delete(id);
  }
}
