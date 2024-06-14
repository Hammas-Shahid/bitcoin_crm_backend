import { Injectable } from '@nestjs/common';
import { CreateLeadCallDto } from './dto/create-lead-call.dto';
import { UpdateLeadCallDto } from './dto/update-lead-call.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadCall } from './entities/lead-call.entity';
import { User } from 'src/users/entities/user.entity';
import { Note, NoteTypes } from 'src/notes/entities/note.entity';
import { NotesService } from 'src/notes/notes.service';

@Injectable()
export class LeadCallsService {
  constructor(
    @InjectRepository(LeadCall)
    private leadCallRepository: Repository<LeadCall>,
    private noteService: NotesService
  ) {}

  
  async create(createLeadCallDto: CreateLeadCallDto, currentUser: User) {
    // Save the LeadCall entity
    const leadCall = await this.leadCallRepository.save({
      leadId: createLeadCallDto.leadId,
      dispositionId: createLeadCallDto.dispositionId,
      duration: createLeadCallDto.duration,
      created_by: currentUser.id,
    });

    // Save the Note entity with the comment
    if (createLeadCallDto.comment) {
      await this.noteService.create({note: createLeadCallDto.comment, type: NoteTypes.Call_Note}, currentUser)
    }

    return leadCall;
  }

  findAll() {
    return `This action returns all leadCalls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leadCall`;
  }

  async update(id: number, updateLeadCallDto: UpdateLeadCallDto, currentUser: User) {
    return await this.leadCallRepository.save({ ...updateLeadCallDto, id, updated_by: currentUser.id });
  }

  async remove(id: number) {
    return await this.leadCallRepository.delete(id);
  }
}
