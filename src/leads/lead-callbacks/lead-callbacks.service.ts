import { Injectable } from '@nestjs/common';
import { CreateLeadCallbackDto } from './dto/create-lead-callback.dto';
import { UpdateLeadCallbackDto } from './dto/update-lead-callback.dto';

@Injectable()
export class LeadCallbacksService {
  create(createLeadCallbackDto: CreateLeadCallbackDto) {
    return 'This action adds a new leadCallback';
  }

  findAll() {
    return `This action returns all leadCallbacks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leadCallback`;
  }

  update(id: number, updateLeadCallbackDto: UpdateLeadCallbackDto) {
    return `This action updates a #${id} leadCallback`;
  }

  remove(id: number) {
    return `This action removes a #${id} leadCallback`;
  }
}
