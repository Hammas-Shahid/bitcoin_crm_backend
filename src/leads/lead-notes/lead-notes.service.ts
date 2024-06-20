import { Injectable } from '@nestjs/common';
import { CreateLeadNoteDto } from './dto/create-lead-note.dto';
import { UpdateLeadNoteDto } from './dto/update-lead-note.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LeadNote } from './entities/lead-note.entity';
import { Repository } from 'typeorm';
import { NotesService } from 'src/notes/notes.service';

@Injectable()
export class LeadNotesService {
  constructor(
    @InjectRepository(LeadNote)
    private leadNoteRepository: Repository<LeadNote>,
    private notesService: NotesService,
  ) {}

  async create(createLeadNoteDto: CreateLeadNoteDto, currentUser: User) {
    const savedNote = await this.notesService.create(
      { content: createLeadNoteDto.content },
      currentUser,
    );
    console.log('here');

    return await this.leadNoteRepository.save({
      leadId: +createLeadNoteDto.leadId,
      noteId: savedNote.id,
      created_by: currentUser.id,
    });
  }

  async findAll() {
    return await this.leadNoteRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} leadNote`;
  }

  update(id: number, updateLeadNoteDto: UpdateLeadNoteDto, currentUser: User) {
    return `This action updates a #${id} leadNote`;
  }

  remove(id: number) {
    return `This action removes a #${id} leadNote`;
  }
}
