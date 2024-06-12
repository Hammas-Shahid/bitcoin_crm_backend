import { Injectable } from '@nestjs/common';
import { CreateLeadCallbackDto } from './dto/create-lead-callback.dto';
import { UpdateLeadCallbackDto } from './dto/update-lead-callback.dto';
import { LeadCallBack } from './entities/lead-callback.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LeadCallbacksService {
  constructor(
    @InjectRepository(LeadCallBack)
    private leadCallBackRepository: Repository<LeadCallBack>,
  ) {}

  async create(createLeadCallDto: CreateLeadCallbackDto, currentUser: User) {
    return await this.leadCallBackRepository.save({
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

  async update(id: number, updateLeadCallDto: UpdateLeadCallbackDto) {
    return await this.leadCallBackRepository.save({ ...updateLeadCallDto, id });
  }

  async remove(id: number) {
    return await this.leadCallBackRepository.delete(id);
  }
}
