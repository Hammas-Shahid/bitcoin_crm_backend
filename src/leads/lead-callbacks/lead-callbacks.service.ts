import { Injectable } from '@nestjs/common';
import { CreateLeadCallbackDto } from './dto/create-lead-callback.dto';
import { UpdateLeadCallbackDto } from './dto/update-lead-callback.dto';
import { LeadCallBack } from './entities/lead-callback.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { NotesService } from 'src/notes/notes.service';
import { NoteTypes } from 'src/notes/entities/note.entity';

@Injectable()
export class LeadCallbacksService {
  constructor(
    @InjectRepository(LeadCallBack)
    private leadCallBackRepository: Repository<LeadCallBack>,
    private noteService: NotesService
  ) {}

  async create(createLeadCallbackDto: CreateLeadCallbackDto, currentUser: User) {
    // Save the LeadCall entity
    const leadCall = await this.leadCallBackRepository.save({
      leadId: createLeadCallbackDto.leadId,
      date:createLeadCallbackDto.date,
      time:createLeadCallbackDto.time,
      created_by:currentUser.id
    });

    // Save the Note entity with the comment
    if (createLeadCallbackDto.comment) {
      await this.noteService.create({note: createLeadCallbackDto.comment, type: NoteTypes.Call_Back_Note}, currentUser)
    }

    return leadCall;
  }
 

  findAll() {
    return `This action returns all leadCalls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leadCall`;
  }

  async update(id: number, updateLeadCallDto: UpdateLeadCallbackDto, currentUser: User) {
    return await this.leadCallBackRepository.save({ ...updateLeadCallDto, id, updated_by: currentUser.id });
  }

  async remove(id: number) {
    return await this.leadCallBackRepository.delete(id);
  }
}
