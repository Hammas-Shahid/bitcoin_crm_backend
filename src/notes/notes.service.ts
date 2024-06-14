import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { LeadCall } from 'src/leads/lead-calls/entities/lead-call.entity';
import { LeadCallBack } from 'src/leads/lead-callbacks/entities/lead-callback.entity';
import { Lead } from 'src/leads/entities/lead.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
    @InjectRepository(LeadCall)
    private callRespository: Repository<LeadCall>,
    @InjectRepository(LeadCallBack)
    private callBackRepository: Repository<LeadCallBack>,
  ) {}

  async create(createNoteDto: Partial<CreateNoteDto>, currentUser: User) {
    createNoteDto['created_by'] = currentUser.id;
    const note = await this.notesRepository.save(createNoteDto);
    if (!note) {
      throw new HttpException('Error creating note', 500);
    }
    return note;
  }

  async getLeadNotes(leadId: number) {
    const lead = await this.leadRepository
      .createQueryBuilder('lead')
      .leftJoinAndSelect('lead.leadCalls', 'leadCall')
      .leftJoinAndSelect('leadCall.note', 'callNote')
      .leftJoinAndSelect('lead.leadCallBacks', 'leadCallBack')
      .leftJoinAndSelect('leadCallBack.note', 'callbackNote')
      .where('lead.id = :leadId', { leadId })
      .orderBy('callNote.created_at', 'ASC')
      .addOrderBy('callbackNote.created_at', 'ASC')
      .getOne();

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    // Combine notes from calls and callbacks
    const callNotes = lead.leadCalls.map((call) => call.note);
    const callbackNotes = lead.leadCallBacks.map((callback) => callback.note);

    // Combine notes and keep them in the order fetched from the database
    const notes = [...callNotes, ...callbackNotes];

    return {
      lead,
      notes,
    };
  }

  async findAll() {
    const results = await this.notesRepository.findAndCount();
    return results;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
