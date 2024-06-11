import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';
import { State } from 'src/states/entities/state.entity';
import { StatesService } from 'src/states/states.service';
import { User } from 'src/users/entities/user.entity';

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

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    const status = await this.statusRepository.preload({
      id,
      ...updateStatusDto,
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
