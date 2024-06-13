import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { ServiceProvider } from './entities/service-provider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { rawQuerySearchInRemovedSpecCharsString, removeSpecialCharsFromString } from 'src/shared/entities/functions/utils';

@Injectable()
export class ServiceProvidersService {
  constructor(
    @InjectRepository(ServiceProvider)
    private providersRepository: Repository<ServiceProvider>,
  ) {}

  async create(
    createServiceProviderDto: CreateServiceProviderDto,
    currentUser: User,
  ) {
    createServiceProviderDto['created_by'] = currentUser.id;
    return await this.providersRepository.save(createServiceProviderDto);
  }

  async findAll() {
    return await this.providersRepository.find();
  }

  /* Page Number Starts At 0 */
  async getFilteredProviders(
    searchString: string,
    page: number,
    limit: number,
  ) {
    const results = await this.providersRepository.findAndCount({
      where: [{ name: ILike(`%${searchString}%`) }],
      relations: { user: true },
      take: limit,
      skip: page * limit,
    });
    return { count: results[1], results: results[0] };
  }

  async findOne(id: number) {
    const businessType = await this.providersRepository.findOneBy({ id });
    if (!businessType) {
      throw new NotFoundException(`BusinessType with ID ${id} not found`);
    }
    return businessType;
  }

  async providerExists(name: string) {
    return await this.providersRepository.exists({
      where: {
        name: rawQuerySearchInRemovedSpecCharsString(
          removeSpecialCharsFromString(name),
        ),
      },
    });
  }

  async update(id: number, updateServiceProviderDto: UpdateServiceProviderDto) {
    await this.providersRepository.update(id, updateServiceProviderDto);
    const updatedProvider = await this.providersRepository.findOneBy({
      id,
    });
    if (!updatedProvider) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }
    return updatedProvider;
  }

  async remove(id: number) {
    const result = await this.providersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }
  }
}