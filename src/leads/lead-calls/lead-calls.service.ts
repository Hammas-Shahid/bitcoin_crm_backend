import { Injectable } from '@nestjs/common';
import { CreateLeadCallDto } from './dto/create-lead-call.dto';
import { UpdateLeadCallDto } from './dto/update-lead-call.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadCall } from './entities/lead-call.entity';
import { User } from 'src/users/entities/user.entity';
import { NotesService } from 'src/notes/notes.service';

@Injectable()
export class LeadCallsService {
  constructor(
    @InjectRepository(LeadCall)
    private leadCallRepository: Repository<LeadCall>,
    private notesService: NotesService
  ) {}

  async create(createLeadCallDto: CreateLeadCallDto, currentUser: User) {
    const {comment, ...createLeadCall } = createLeadCallDto;
    let savedComment = null;
    let commentId = null;
    if (comment){
      savedComment = await this.notesService.create({content: comment}, currentUser);
      commentId = savedComment.id;
    }
    const savedLeadCall = await this.leadCallRepository.save({
      ...createLeadCall,
      commentId: savedComment ? savedComment.id : null,
      created_by: currentUser.id,
    });
    return {...savedLeadCall, comment: savedComment, commentId}
  }

  findAll() {
    return `This action returns all leadCalls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leadCall`;
  }

  async update(id: number, updateLeadCallDto: UpdateLeadCallDto, currentUser: User) {
    const {comment, ...updateLeadCall } = updateLeadCallDto;
    const leadCall = await this.leadCallRepository.findOne({where: {id}, relations: {comment: true}})

    let updatedComment = null;
    const updatedLeadCall = await this.leadCallRepository.save({
      ...updateLeadCall,
      updated_by: currentUser.id,
    });
    if (comment && leadCall.comment?.content !== comment){
      if (leadCall.commentId){
        updatedComment = await this.notesService.update(leadCall.commentId, {content: comment}, currentUser);
      }
      else{
          updatedComment = await this.notesService.create({content: comment}, currentUser)
      }
    }
    
    return {...updatedLeadCall, comment: updatedComment, commentId: updatedComment ? updatedComment.id : null}
  }

  async remove(id: number) {
    return await this.leadCallRepository.delete(id);
  }
}
