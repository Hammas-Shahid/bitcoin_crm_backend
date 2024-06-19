import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLeadCallbackDto } from './dto/create-lead-callback.dto';
import { UpdateLeadCallbackDto } from './dto/update-lead-callback.dto';
import { LeadCallBack } from './entities/lead-callback.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { NotesService } from 'src/notes/notes.service';
import { State } from 'src/states/entities/state.entity';
import { Lead } from '../entities/lead.entity';

@Injectable()
export class LeadCallbacksService {
  constructor(
    @InjectRepository(LeadCallBack)
    private leadCallBackRepository: Repository<LeadCallBack>,
    private notesService: NotesService,
    private dataSource: DataSource
  ) {}

  async create(createLeadCallBackDto: CreateLeadCallbackDto, currentUser: User) {
    const closedState = this.dataSource.manager.findOne(State, {where: {name: 'Closed'}});
    const leadStateClosed = await this.dataSource.manager.exists(Lead, {where: {id: createLeadCallBackDto.leadId, status: {stateId: (await closedState).id}}});
    if (leadStateClosed){
      throw new BadRequestException("Call-Backs cannot be scheduled on leads with a closed state.");
    }
    const currentTime = new Date();
    const callbackTime = new Date(createLeadCallBackDto.date+'T'+createLeadCallBackDto.time);
    
    if (currentTime>callbackTime){
      throw new BadRequestException('Call-Backs cannot be scheduled on past Date/Time')
    }
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

  async findAllByLeadId(leadId: number) {
    return await this.leadCallBackRepository.find({where: {leadId}});
  }

  findOne(id: number) {
    return `This action returns a #${id} leadCall`;
  }

  async update(id: number, updateLeadCallBackDto: UpdateLeadCallbackDto, currentUser: User) {

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
