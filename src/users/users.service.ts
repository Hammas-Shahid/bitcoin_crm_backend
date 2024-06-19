import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRoles } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto, currentUser: User) {
    if (currentUser.role !== UserRoles.Admin) {
      throw new UnauthorizedException();
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    createUserDto['created_by'] = currentUser.id;
    let savedUser = await this.userRepository.save(createUserDto);
    delete savedUser.password;
    return savedUser;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  /* Page Number Starts At 0 */
  async getFilteredUsers(searchString: string, page: number, limit: number) {
    const results = await this.userRepository.findAndCount({
      where: [
        { name: ILike(`%${searchString}%`) },
        { email: ILike(`%${searchString}%`) },
        { role: ILike(`%${searchString}%`) as any },
      ],
      order: { created_at: 'DESC' },
      take: limit,
      skip: page * limit,
    });
    return { count: results[1], results: results[0] };
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: ILike(email) },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        is_active: true,
        role: true,
        failed_attempts: true,
      },
    });
  }

  async userWithEmailExists(email: string) {
    return await this.userRepository.exists({
      where: { email: ILike(`%${email}%`) },
    });
  }

  async clearFailedAttempts(id: number){
    await this.userRepository.update(id, {failed_attempts: 0});
  }

  async findOneForLogin(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return await this.userRepository.save(user);
  }

  async addFailedAttemptAndDisable(id: number, previousFailedAttempts: number) {
    const currentFailedAttempts = previousFailedAttempts + 1;
    if (currentFailedAttempts === 3) {
      await this.userRepository.update(id, {
        failed_attempts: currentFailedAttempts,
        is_active: false,
      });
      return;
    }
    await this.userRepository.update(id, {
      failed_attempts: currentFailedAttempts,
    });
  }

  async toggleActiveStatus(id: number, is_active: boolean) {
    await this.userRepository.update(id, { is_active });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    currentUser: Partial<User>,
  ) {
    if (currentUser.role !== UserRoles.Admin && updateUserDto.password) {
      delete updateUserDto.password;
    }
    const user = await this.userRepository.preload({ id, ...updateUserDto, updated_by: currentUser.id });

    if (!user) {
      throw new Error('User not found');
    }

    return await this.userRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
