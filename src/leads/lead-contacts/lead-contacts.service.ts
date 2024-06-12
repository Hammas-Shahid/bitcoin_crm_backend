import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLeadContactDto } from './dto/create-lead-contact.dto';
import { LeadContact } from './entities/lead-contact.entity';

@Injectable()
export class LeadContactsService {
  constructor(
    @InjectRepository(LeadContact)
    private leadContactRepository: Repository<LeadContact>,
  ) {}

  async create(createLeadContactDto: CreateLeadContactDto) {
    const leadContact = this.leadContactRepository.create(createLeadContactDto);
    return this.leadContactRepository.save(leadContact);
  }

  async findOneByLeadAndContact(leadId: number, contactId: number) {
    return this.leadContactRepository.findOne({
      where: { leadId, contactId },
    });
  }

  async remove(id: number) {
    const leadContact = await this.leadContactRepository.findOne({
      where: { id },
    });

    if (!leadContact) {
      throw new NotFoundException(`LeadContact with ID ${id} not found`);
    }

    return this.leadContactRepository.remove(leadContact);
  }
}
