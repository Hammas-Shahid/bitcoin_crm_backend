import { Injectable } from '@nestjs/common';
import { CreateLeadCallDto } from './dto/create-lead-call.dto';
import { UpdateLeadCallDto } from './dto/update-lead-call.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadCall } from './entities/lead-call.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LeadCallsService {
  constructor(
    @InjectRepository(LeadCall)
    private leadCallRepository: Repository<LeadCall>,
  ) {}

  async create(createLeadCallDto: CreateLeadCallDto, currentUser: User) {
    console.log(createLeadCallDto);

    return await this.leadCallRepository.save({
      ...createLeadCallDto,
      created_by: currentUser.id,
    });
  }

  findAll() {
    return `This action returns all leadCalls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leadCall`;
  }

  async update(id: number, updateLeadCallDto: UpdateLeadCallDto) {
    return await this.leadCallRepository.save({ ...updateLeadCallDto, id });
  }

  async remove(id: number) {
    return await this.leadCallRepository.delete(id);
  }
}
