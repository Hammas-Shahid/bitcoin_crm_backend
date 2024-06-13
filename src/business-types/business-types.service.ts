import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateBusinessTypeDto } from './dto/create-business-type.dto';
import { UpdateBusinessTypeDto } from './dto/update-business-type.dto';
import { BusinessType } from './entities/business-type.entity';
import { User } from 'src/users/entities/user.entity';
import {
  rawQuerySearchInRemovedSpecCharsString,
  removeSpecialCharsFromString,
} from 'src/shared/entities/functions/utils';

@Injectable()
export class BusinessTypesService {
  constructor(
    @InjectRepository(BusinessType)
    private businessTypesRepository: Repository<BusinessType>,
  ) {}

  async create(
    createBusinessTypeDto: CreateBusinessTypeDto,
    currentUser: User,
  ) {
    createBusinessTypeDto['created_by'] = currentUser.id;
    return await this.businessTypesRepository.save(createBusinessTypeDto);
  }

  async findAll() {
    return await this.businessTypesRepository.find();
  }

  /* Page Number Starts At 0 */
  async getFilteredBusinessTypes(
    searchString: string,
    page: number,
    limit: number,
  ) {
    const results = await this.businessTypesRepository.findAndCount({
      where: [{ name: ILike(`%${searchString}%`) }],
      relations: { user: true },
      take: limit,
      skip: page * limit,
    });
    return { count: results[1], results: results[0] };
  }

  async findOne(id: number) {
    const businessType = await this.businessTypesRepository.findOneBy({ id });
    if (!businessType) {
      throw new NotFoundException(`BusinessType with ID ${id} not found`);
    }
    return businessType;
  }

  async businessTypeExists(name: string) {
    return await this.businessTypesRepository.exists({
      where: {
        name: rawQuerySearchInRemovedSpecCharsString(
          removeSpecialCharsFromString(name),
        ),
      },
    });
  }

  async update(id: number, updateBusinessTypeDto: UpdateBusinessTypeDto, currentUser: User) {
    await this.businessTypesRepository.update(id, {...updateBusinessTypeDto, updated_by: currentUser.id});
    const updatedBusinessType = await this.businessTypesRepository.findOneBy({
      id,
    });
    if (!updatedBusinessType) {
      throw new NotFoundException(`BusinessType with ID ${id} not found`);
    }
    return updatedBusinessType;
  }

  async remove(id: number) {
    const result = await this.businessTypesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`BusinessType with ID ${id} not found`);
    }
  }
}
