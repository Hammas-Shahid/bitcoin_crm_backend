import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class NotesService {

  constructor(@InjectRepository(Note) private notesRepository: Repository<Note>){}

  async create(createNoteDto: CreateNoteDto, currentUser: User) {
    return await this.notesRepository.save({...createNoteDto, created_by: currentUser.id})
  }

  findAll() {
    return `This action returns all notes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, currentUser: User) {
    return await this.notesRepository.save({id, content: updateNoteDto.content, updated_by: currentUser.id})
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
