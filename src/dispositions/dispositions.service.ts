import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateDispositionDto } from './dto/create-disposition.dto';
import { UpdateDispositionDto } from './dto/update-disposition.dto';
import { Disposition } from './entities/disposition.entity';
import { User } from 'src/users/entities/user.entity';

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
