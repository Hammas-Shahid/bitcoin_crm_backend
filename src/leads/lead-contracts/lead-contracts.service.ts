import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeadContractDto } from './dto/create-lead-contract.dto';
import { UpdateLeadContractDto } from './dto/update-lead-contract.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LeadContract } from './entities/lead-contract.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LeadContractsService {
  constructor(
    @InjectRepository(LeadContract)
    private leadContractRepository: Repository<LeadContract>,
  ) {}

  async create(
    createLeadContractDto: CreateLeadContractDto,
    currentUser: User,
  ) {
    const leadContract = this.leadContractRepository.create(
      createLeadContractDto,
    );
    return await this.leadContractRepository.save({
      ...leadContract,
      created_by: currentUser.id,
    });
  }

  async findAll() {
    return await this.leadContractRepository.find();
  }

  async findOne(id: number): Promise<LeadContract> {
    const leadContract = await this.leadContractRepository.findOne({
      where: { id },
    });
    if (!leadContract) {
      throw new NotFoundException(`LeadContract with ID ${id} not found`);
    }
    return leadContract;
  }

  async update(
    id: number,
    updateLeadContractDto: UpdateLeadContractDto,
    currentUser: User,
  ) {
    return await this.leadContractRepository.save({
      ...updateLeadContractDto,
      updated_by: currentUser.id,
    });
  }

  async remove(id: number): Promise<void> {
    const leadContract = await this.findOne(id);
    await this.leadContractRepository.remove(leadContract);
  }
}
