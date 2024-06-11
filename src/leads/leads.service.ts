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
import { ContactsService } from 'src/contacts/contacts.service';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
    private contactsService: ContactsService,
  ) {}

  async create(createLeadDto: CreateLeadDto, currentUser: User) {
    const leadContactsDTOs = structuredClone(createLeadDto.leadContacts);
    delete createLeadDto.leadContacts;
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
    const savedLead = await this.leadRepository.save(lead);
    for (let contactDTO of leadContactsDTOs) {
      const newContact = await this.contactsService.create(
        contactDTO,
        currentUser,
      );
      await this.addContact(savedLead.id, newContact.id);
    }
    return this.leadRepository.findOne({
      where: { id: savedLead.id },
      relations: {
        assignee: true,
        status: true,
        businessType: true,
        contacts: true,
      },
    });
  }

  async findAll() {
    return await this.leadRepository.find({
      relations: {
        businessType: true,
        assignee: true,
        status: true,
        contacts: true,
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

  async addressExists(address: string) {
    address = address.trim();
    return await this.leadRepository.exists({ where: { address } });
  }

  async addContact(leadId: number, contactId: number) {
    const lead = await this.findOne(leadId);
    const contact = await this.contactsService.findOne(contactId);
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${contactId} not found`);
    }
    lead.contacts = [...lead.contacts, contact];
    return await this.leadRepository.save(lead);
  }

  async removeContact(leadId: number, contactId: number) {
    const lead = await this.findOne(leadId);
    lead.contacts = lead.contacts.filter((contact) => contact.id !== contactId);
    return await this.leadRepository.save(lead);
  }
}
