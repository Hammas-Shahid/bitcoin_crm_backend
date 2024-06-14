import { Injectable } from '@nestjs/common';
import { CreateLeadNoteDto } from './dto/create-lead-note.dto';
import { UpdateLeadNoteDto } from './dto/update-lead-note.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LeadNotesService {
  create(createLeadNoteDto: CreateLeadNoteDto) {
    return 'This action adds a new leadNote';
  }

  findAll() {
    return `This action returns all leadNotes`;
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
