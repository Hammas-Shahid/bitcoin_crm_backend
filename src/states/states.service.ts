import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { State } from './entities/state.entity';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private stateRepository: Repository<State>,
  ) {}

  async create(
    createStateDto: CreateStateDto,
    currentUser: User,
  ): Promise<State> {
    createStateDto['created_by'] = currentUser.id;
    const state = this.stateRepository.create(createStateDto);
    return await this.stateRepository.save(state);
  }

  async findAll(): Promise<State[]> {
    return await this.stateRepository.find();
  }

  /* Page Number Starts At 0 */
  async getFilteredstates(searchString: string, page: number, limit: number) {
    const results = await this.stateRepository.findAndCount({
      where: [{ name: ILike(`%${searchString}%`) }],
      take: limit,
      skip: page * limit,
    });
    return { count: results[1], results: results[0] };
  }

  async findOne(id: number): Promise<State> {
    const state = await this.stateRepository.findOneBy({ id });
    if (!state) {
      throw new NotFoundException(`State with ID ${id} not found`);
    }
    return state;
  }

  async update(id: number, updateStateDto: UpdateStateDto): Promise<State> {
    await this.stateRepository.update(id, updateStateDto);
    const updatedState = await this.stateRepository.findOneBy({ id });
    if (!updatedState) {
      throw new NotFoundException(`State with ID ${id} not found`);
    }
    return updatedState;
  }

  async remove(id: number): Promise<void> {
    const result = await this.stateRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`State with ID ${id} not found`);
    }
  }
}
