import { Injectable } from '@nestjs/common';
import { CreateSaleNoteDto } from './dto/create-sale-note.dto';
import { UpdateSaleNoteDto } from './dto/update-sale-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleNote } from './entities/sale-note.entity';
import { Repository } from 'typeorm';
import { NotesService } from 'src/notes/notes.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SaleNotesService {
  constructor(@InjectRepository(SaleNote) private saleNoteRepository: Repository<SaleNote>, private notesService: NotesService){}
  
  async create(createSaleNoteDto: CreateSaleNoteDto, currentUser: User) {
    const savedNote = await this.notesService.create({content: createSaleNoteDto.content}, currentUser);
    return await this.saleNoteRepository.save({saleId: createSaleNoteDto.saleId, noteId: savedNote.id, created_by: currentUser.id})
  }

  async findAll() {
    return await this.saleNoteRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} saleNote`;
  }

  update(id: number, updateSaleNoteDto: UpdateSaleNoteDto) {
    return `This action updates a #${id} saleNote`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleNote`;
  }
}
