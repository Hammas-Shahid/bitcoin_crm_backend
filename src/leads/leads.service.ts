import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { User, UserRoles } from 'src/users/entities/user.entity';
import { ContactsService } from 'src/contacts/contacts.service';
import { LeadContactsService } from './lead-contacts/lead-contacts.service';
import { rawQuerySearchInRemovedSpacesFromString } from 'src/shared/entities/functions/utils';
import { StatesService } from 'src/states/states.service';
import { StatusesService } from 'src/statuses/statuses.service';
import { LeadFiltersDto } from './leads.controller';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
    private contactsService: ContactsService,
    private leadContactService: LeadContactsService,
    private statusService: StatusesService,
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
        leadContacts: { contact: true },
        leadCalls: { disposition: true, user: true, comment: true },
        leadNotes: { note: { user: true } },
      },
    });

    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    return lead;
  }

  /* Page Number Starts At 0 */
  async getFilteredLeads(filters: LeadFiltersDto, page: number, limit: number) {
    filters.lastDisposition = +filters.lastDisposition;
    const queryBuilder = this.leadRepository
      .createQueryBuilder('lead')
      .leftJoinAndSelect('lead.businessType', 'businessType')
      .leftJoinAndSelect('lead.assignee', 'assignee')
      .leftJoinAndSelect('lead.status', 'status')
      .leftJoinAndSelect('lead.leadCalls', 'leadCall');

    queryBuilder.andWhere('lead.saleMadeById ILIKE :saleMadeById', {
      saleMadeById: null,
    });

    if (filters.businessName) {
      queryBuilder.andWhere('lead.businessName ILIKE :businessName', {
        businessName: `%${filters.businessName}%`,
      });
    }
    if (filters.address) {
      queryBuilder.andWhere('lead.address ILIKE :address', {
        address: `%${filters.address}%`,
      });
    }
    if (filters.city) {
      queryBuilder.andWhere('lead.city ILIKE :city', {
        city: `%${filters.city}%`,
      });
    }
    if (filters.email) {
      queryBuilder.andWhere('lead.email ILIKE :email', {
        email: `%${filters.email}%`,
      });
    }
    if (filters.phoneNumber) {
      queryBuilder.andWhere('lead.phoneNumber ILIKE :phoneNumber', {
        phoneNumber: `%${filters.phoneNumber}%`,
      });
    }
    if (filters.businessTypeId) {
      queryBuilder.andWhere('lead.businessTypeId = :businessTypeId', {
        businessTypeId: filters.businessTypeId,
      });
    }
    if (filters.assigneeId) {
      queryBuilder.andWhere('lead.assigneeId = :assigneeId', {
        assigneeId: filters.assigneeId,
      });
    }
    if (filters.statusId) {
      queryBuilder.andWhere('lead.statusId = :statusId', {
        statusId: filters.statusId,
      });
    }
    if (filters.lastDisposition) {
      console.log(filters.lastDisposition);

      queryBuilder.andWhere(
        (qb) => {
          const subQuery = qb
            .subQuery()
            .select('lc.id')
            .from('lead_call', 'lc')
            .where('lc.leadId = lead.id')
            .andWhere('lc.dispositionId = :lastDisposition')
            .orderBy('lc.created_at', 'DESC')
            .limit(1)
            .getQuery();
          return `EXISTS (${subQuery})`;
        },
        { lastDisposition: filters.lastDisposition },
      );
    }

    queryBuilder.take(limit).skip(page * limit);

    const [results, count] = await queryBuilder.getManyAndCount();
    return { count, results };
  }

  async getPaginatedLeads(page: number, limit: number) {
    const results = await this.leadRepository.findAndCount({
      where: { saleInfo: IsNull() },
      relations: {
        status: true,
        businessType: true,
        assignee: true,
        leadCalls: true,
        leadContacts: { contact: true },
      },
      take: limit,
      skip: page * limit,
      order: { created_at: 'DESC' },
    });
    return { count: results[1], results: results[0] };
  }

  async getPaginatedUnassignedLeads(page: number, limit: number) {
    const results = await this.leadRepository.findAndCount({
      where: { assigneeId: IsNull(), saleInfo: IsNull() },
      relations: {
        status: true,
        businessType: true,
        assignee: true,
        leadCalls: true,
      },
      take: limit,
      skip: page * limit,
      order: { created_at: 'DESC' },
    });
    return { count: results[1], results: results[0] };
  }

  async getPaginatedAssignedLeads(page: number, limit: number) {
    const results = await this.leadRepository.findAndCount({
      where: { assigneeId: Not(IsNull()), saleInfo: IsNull() },
      relations: {
        status: true,
        businessType: true,
        assignee: true,
        leadCalls: true,
      },
      take: limit,
      skip: page * limit,
      order: { created_at: 'DESC' },
    });
    return { count: results[1], results: results[0] };
  }

  async getPaginatedSales(page: number, limit: number) {
    const results = await this.leadRepository.findAndCount({
      where: { saleInfo: Not(IsNull()) },
      relations: {
        status: true,
        businessType: true,
        assignee: true,
        leadCalls: true,
      },
      take: limit,
      skip: page * limit,
      order: { created_at: 'DESC' },
    });
    return { count: results[1], results: results[0] };
  }

  async update(id: number, updateLeadDto: UpdateLeadDto, currentUser: User) {
    const lead = await this.leadRepository.preload({
      id,
      ...updateLeadDto,
      updated_by: currentUser.id,
    } as unknown as Lead);

    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    return await this.leadRepository.save(lead);
  }

  async updateLeadAssignee(
    leadId: number,
    assigneeId: number,
    currentUser: User,
  ) {
    if (currentUser.role !== UserRoles.Admin) {
      throw new UnauthorizedException();
    }
    await this.leadRepository.update(
      { id: leadId },
      { assigneeId, updated_by: currentUser.id },
    );
    return { message: 'Success' };
  }

  async updateLeadStatus(leadId: number, statusId: number, currentUser: User) {
    const status = await this.statusService.getStatusWithState(statusId);
    const statusState = status.state;
    if (statusState.name === 'On Hold') {
      await this.update(leadId, { assigneeId: null }, currentUser);
    }
    await this.leadRepository.update(
      { id: leadId },
      { statusId, updated_by: currentUser.id },
    );
    return { message: 'Success' };
  }

  async remove(id: number) {
    const lead = await this.findOne(id);
    return await this.leadRepository.remove(lead);
  }

  async addressExists(address: string) {
    address = address.trim();
    return await this.leadRepository.findOne({
      where: {
        address: rawQuerySearchInRemovedSpacesFromString(address),
      },
    });
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
