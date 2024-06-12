import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateDispositionDto } from './dto/create-disposition.dto';
import { UpdateDispositionDto } from './dto/update-disposition.dto';
import { Disposition } from './entities/disposition.entity';
import { User } from 'src/users/entities/user.entity';
import { take } from 'rxjs';

@Injectable()
export class DispositionsService {
  constructor(
    @InjectRepository(Disposition)
    private dispositionRepository: Repository<Disposition>,
  ) {}

  async create(createDispositionDto: CreateDispositionDto, currentUser: User) {
    return await this.dispositionRepository.save({
      ...createDispositionDto,
      created_by: currentUser.id,
    });
  }

  async findAll() {
    return await this.dispositionRepository.find();
  }

  async findOne(id: number) {
    const disposition = await this.dispositionRepository.findOne({
      where: { id },
    });
    if (!disposition) {
      throw new NotFoundException(`Disposition with ID ${id} not found`);
    }
    return disposition;
  }

  async getFilteredDispositions(
    searchString: string,
    pageIndex: number,
    pageLimit: number,
  ) {
    const results = await this.dispositionRepository.findAndCount({
      where: [
        { name: ILike(`%${searchString}%`) },
        { user: { name: ILike(`%${searchString}%`) } },
      ],
      relations: { user: true, leadCalls: true },
      skip: pageIndex * pageLimit,
      take: pageLimit,
      order: { id: 'DESC' },
    });
    return { count: results[1], results: results[0] };
  }

  async dispositionExists(name: string) {
    return await this.dispositionRepository.exists({
      where: { name: ILike(name) },
    });
  }

  async update(id: number, updateDispositionDto: UpdateDispositionDto) {
    const disposition = await this.dispositionRepository.preload({
      id,
      ...updateDispositionDto,
    });
    if (!disposition) {
      throw new NotFoundException(`Disposition with ID ${id} not found`);
    }
    return await this.dispositionRepository.save(disposition);
  }

  async remove(id: number) {
    const disposition = await this.findOne(id);
    return await this.dispositionRepository.remove(disposition);
  }
}
