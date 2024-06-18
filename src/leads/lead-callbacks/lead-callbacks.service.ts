import { Injectable } from '@nestjs/common';
import { CreateLeadCallbackDto } from './dto/create-lead-callback.dto';
import { UpdateLeadCallbackDto } from './dto/update-lead-callback.dto';
import { LeadCallBack } from './entities/lead-callback.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { NotesService } from 'src/notes/notes.service';

@Injectable()
export class LeadCallbacksService {
  constructor(
    @InjectRepository(LeadCallBack)
    private leadCallBackRepository: Repository<LeadCallBack>,
    private notesService: NotesService
  ) {}

  async create(createLeadCallBackDto: CreateLeadCallbackDto, currentUser: User) {

    const {comment, ...createLeadCallBack } = createLeadCallBackDto;
    let savedComment = null;
    let commentId = null;
    if (comment){
      savedComment = await this.notesService.create({content: comment}, currentUser);
      commentId = savedComment.id;
    }
    const savedLeadCallBack = await this.leadCallBackRepository.save({
      ...createLeadCallBack,
      commentId: savedComment ? savedComment.id : null,
      created_by: currentUser.id,
    });
    return {...savedLeadCallBack, comment: savedComment, commentId}

  }

  findAll() {
    return `This action returns all leadCalls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leadCall`;
  }

  async update(id: number, updateLeadCallBackDto: UpdateLeadCallbackDto, currentUser: User) {
    // return await this.leadCallBackRepository.save({ ...updateLeadCallDto, id, updated_by: currentUser.id });

    const {comment, ...updateLeadCallBack } = updateLeadCallBackDto;
    const leadCallBack = await this.leadCallBackRepository.findOne({where: {id}, relations: {comment: true}})

    let updatedComment = null;
    const updatedLeadCallBack = await this.leadCallBackRepository.save({
      ...updateLeadCallBack,
      updated_by: currentUser.id,
    });
    if (comment && leadCallBack.comment?.content !== comment){
      if (leadCallBack.commentId){
        updatedComment = await this.notesService.update(leadCallBack.commentId, {content: comment}, currentUser);
      }
      else{
          updatedComment = await this.notesService.create({content: comment}, currentUser)
      }
    }
    
    return {...updatedLeadCallBack, comment: updatedComment, commentId: updatedComment ? updatedComment.id : null}
  }

  async remove(id: number) {
    return await this.leadCallBackRepository.delete(id);
  }
}
