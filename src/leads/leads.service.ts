import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) {}

  async create(createLeadDto: CreateLeadDto, currentUser: User) {
    const existingLead = await this.leadRepository.findOne({
      where: { address: createLeadDto.address },
    });
    if (existingLead) {
      throw new ConflictException('Lead with this address already exists');
    }
    const lead = this.leadRepository.create({
      ...createLeadDto,
      created_by: currentUser.id,
    });
    return await this.leadRepository.save(lead);
  }

  async findAll() {
    return await this.leadRepository.find({
      relations: {
        businessType: true,
        assignee: true,
        status: true,
      },
    });
  }

  async findOne(id: number) {
    const lead = await this.leadRepository.findOne({
      where: { id },
    });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return lead;
  }

  async update(id: number, updateLeadDto: UpdateLeadDto) {
    const lead = await this.leadRepository.preload({ id, ...updateLeadDto });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return await this.leadRepository.save(lead);
  }

  async remove(id: number) {
    const lead = await this.findOne(id);
    return await this.leadRepository.remove(lead);
  }
}
