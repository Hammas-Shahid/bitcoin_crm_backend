import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';
import { State } from 'src/states/entities/state.entity';
import { StatesService } from 'src/states/states.service';
import { User } from 'src/users/entities/user.entity';
import {
  rawQuerySearchInRemovedSpecCharsString,
  removeSpecialCharsFromString,
} from 'src/shared/entities/functions/utils';
import { cursorTo } from 'readline';

@Injectable()
export class StatusesService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    private stateService: StatesService,
  ) {}

  async create(createStatusDto: CreateStatusDto, currentUser: User) {
    const state = await this.stateService.findOne(createStatusDto.stateId);
    if (!state) {
      throw new NotFoundException(
        `State with ID ${createStatusDto.stateId} not found`,
      );
    }
    return await this.statusRepository.save({
      ...createStatusDto,
      created_by: currentUser.id,
    });
  }

  async findAll() {
    return await this.statusRepository.find({ relations: { state: true } });
  }

  async findOne(id: number) {
    const status = await this.statusRepository.findOne({
      where: { id },
    });
    if (!status) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }
    return status;
  }

  /* Page Number Starts At 0 */
  async getFilteredStatuses(searchString: string, page: number, limit: number) {
    const results = await this.statusRepository.findAndCount({
      where: [
        {
          name: ILike(`%${searchString}%`),
        },
      ],
      relations: { user: true },
      take: limit,
      skip: page * limit,
    });
    return { count: results[1], results: results[0] };
  }

  async statusExists(name: string) {
    return await this.statusRepository.exists({
      where: {
        name: rawQuerySearchInRemovedSpecCharsString(
          removeSpecialCharsFromString(name),
        ),
      },
    });
  }

  async update(id: number, updateStatusDto: UpdateStatusDto, currentUser: User) {
    const status = await this.statusRepository.preload({
      id,
      ...updateStatusDto,
      updated_by: currentUser.id
    });
    if (!status) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }
    if (updateStatusDto.stateId) {
      const state = await this.stateService.findOne(updateStatusDto.stateId);
      if (!state) {
        throw new NotFoundException(
          `State with ID ${updateStatusDto.stateId} not found`,
        );
      }
      status.state = state;
    }
    return this.statusRepository.save(status);
  }

  async remove(id: number) {
    const result = await this.statusRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }
  }
}
