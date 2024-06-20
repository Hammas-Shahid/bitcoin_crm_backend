import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateLeadCallDto } from './dto/create-lead-call.dto';
import { UpdateLeadCallDto } from './dto/update-lead-call.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { LeadCall } from './entities/lead-call.entity';
import { User } from 'src/users/entities/user.entity';
import { NotesService } from 'src/notes/notes.service';
import { Lead } from '../entities/lead.entity';
import { State } from 'src/states/entities/state.entity';
import { Disposition } from 'src/dispositions/entities/disposition.entity';
import { LeadsService } from '../leads.service';

@Injectable()
export class LeadCallsService {
  constructor(
    @InjectRepository(LeadCall)
    private leadCallRepository: Repository<LeadCall>,
    private notesService: NotesService,
    @Inject(forwardRef(() => LeadsService))
    private leadsService: LeadsService,
    private dataSource: DataSource,
  ) {}

  async create(createLeadCallDto: CreateLeadCallDto, currentUser: User) {
    const closedState = await this.dataSource.manager.findOne(State, {
      where: { name: 'Closed' },
    });
    const leadStateClosed = await this.dataSource.manager.exists(Lead, {
      where: {
        id: createLeadCallDto.leadId,
        status: { stateId: closedState.id },
      },
    });
    if (leadStateClosed) {
      throw new BadRequestException(
        'Calls cannot be made on leads with a closed state.',
      );
    }
    const { comment, ...createLeadCall } = createLeadCallDto;
    let savedComment = null;
    let commentId = null;
    if (comment) {
      savedComment = await this.notesService.create(
        { content: comment },
        currentUser,
      );
      commentId = savedComment.id;
    }
    const saleMadeDisposition = await this.dataSource.manager.findOne(
      Disposition,
      { where: { name: 'Sale Made' } },
    );
    console.log(createLeadCall, saleMadeDisposition);

    if (createLeadCall.dispositionId == saleMadeDisposition.id) {
      console.log('entered');

      this.leadsService.update(
        createLeadCall.leadId,
        {
          saleInfo: {
            dateSaleMade: new Date().toISOString(),
            saleMadeById: currentUser.id,
            saleMadeByUser: currentUser,
          },
        },
        currentUser,
      );
    }
    const savedLeadCall = await this.leadCallRepository.save({
      ...createLeadCall,
      commentId: savedComment ? savedComment.id : null,
      created_by: currentUser.id,
    });
    return { ...savedLeadCall, comment: savedComment, commentId };
  }

  findAll() {
    return `This action returns all leadCalls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leadCall`;
  }

  async update(
    id: number,
    updateLeadCallDto: UpdateLeadCallDto,
    currentUser: User,
  ) {
    const { comment, ...updateLeadCall } = updateLeadCallDto;
    const leadCall = await this.leadCallRepository.findOne({
      where: { id },
      relations: { comment: true },
    });

    let updatedComment = null;
    const updatedLeadCall = await this.leadCallRepository.save({
      ...updateLeadCall,
      updated_by: currentUser.id,
    });
    if (comment && leadCall.comment?.content !== comment) {
      if (leadCall.commentId) {
        updatedComment = await this.notesService.update(
          leadCall.commentId,
          { content: comment },
          currentUser,
        );
      } else {
        updatedComment = await this.notesService.create(
          { content: comment },
          currentUser,
        );
      }
    }

    return {
      ...updatedLeadCall,
      comment: updatedComment,
      commentId: updatedComment ? updatedComment.id : null,
    };
  }

  async remove(id: number) {
    return await this.leadCallRepository.delete(id);
  }
}
