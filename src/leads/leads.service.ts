import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { User } from 'src/users/entities/user.entity';
import { ContactsService } from 'src/contacts/contacts.service';
import { LeadContactsService } from './lead-contacts/lead-contacts.service';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
    private contactsService: ContactsService,
    private leadContactService: LeadContactsService,
  ) {}

  async create(createLeadDto: CreateLeadDto, currentUser: User) {
    const leadContactsDTOs = structuredClone(createLeadDto.leadContacts);
    delete createLeadDto.leadContacts;

    const lead = this.leadRepository.create({
      ...createLeadDto,
      created_by: currentUser.id,
    } as unknown as Lead);

    const savedLead = await this.leadRepository.save(lead);

    for (const contactDTO of leadContactsDTOs) {
      const newContact = await this.contactsService.create(
        contactDTO,
        currentUser,
      );
      await this.leadContactService.create({
        leadId: savedLead.id,
        contactId: newContact.id,
      });
    }

    return this.leadRepository.findOne({
      where: { id: savedLead.id },
      relations: {
        assignee: true,
        status: true,
        businessType: true,
        leadContacts: true,
      },
    });
  }

  async findAll() {
    return await this.leadRepository.find({
      relations: {
        businessType: true,
        assignee: true,
        status: true,
        leadContacts: true,
      },
    });
  }

  async findOne(id: number) {
    const lead = await this.leadRepository.findOne({
      where: { id },
      relations: {
        businessType: true,
        assignee: true,
        status: true,
        leadContacts: true,
      },
    });

    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    return lead;
  }

  async update(id: number, updateLeadDto: UpdateLeadDto) {
    const lead = await this.leadRepository.preload({
      id,
      ...updateLeadDto,
    } as unknown as Lead);

    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    return await this.leadRepository.save(lead);
  }

  async remove(id: number) {
    const lead = await this.findOne(id);
    return await this.leadRepository.remove(lead);
  }

  async addressExists(address: string) {
    address = address.trim();
    return await this.leadRepository.findOne({ where: { address } });
  }

  async addContact(leadId: number, contactId: number) {
    const lead = await this.findOne(leadId);
    const contact = await this.contactsService.findOne(contactId);

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${contactId} not found`);
    }

    await this.leadContactService.create({
      leadId: lead.id,
      contactId: contact.id,
    });

    return await this.findOne(leadId);
  }

  async removeContact(leadId: number, contactId: number) {
    const leadContact = await this.leadContactService.findOneByLeadAndContact(
      leadId,
      contactId,
    );

    if (!leadContact) {
      throw new NotFoundException(
        `LeadContact with lead ID ${leadId} and contact ID ${contactId} not found`,
      );
    }

    await this.leadContactService.remove(leadContact.id);

    return await this.findOne(leadId);
  }
}