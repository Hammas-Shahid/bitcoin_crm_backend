import { Injectable } from '@nestjs/common';
import { CreateLeadCallDto } from './dto/create-lead-call.dto';
import { UpdateLeadCallDto } from './dto/update-lead-call.dto';

@Injectable()
export class LeadCallsService {
  create(createLeadCallDto: CreateLeadCallDto) {
    return 'This action adds a new leadCall';
  }

  findAll() {
    return `This action returns all leadCalls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leadCall`;
  }

  update(id: number, updateLeadCallDto: UpdateLeadCallDto) {
    return `This action updates a #${id} leadCall`;
  }

  remove(id: number) {
    return `This action removes a #${id} leadCall`;
  }
}
