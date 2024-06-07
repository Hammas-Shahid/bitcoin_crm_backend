import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BypassJwtAuth } from 'src/auth/bypass-jwt-auth.decorator';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UserRoles } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Req() req: any, @Body() createUserDto: CreateUserDto) {
    if (req.body.user.role !== UserRoles.Admin) {
      throw new UnauthorizedException();
    }
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Post(':id/toggleStatus')
  toggleStatus(
    @Body() updateUserStatusDTO: { id: number; is_active: boolean },
  ) {
    return this.usersService.toggleActiveStatus(
      updateUserStatusDTO.id,
      updateUserStatusDTO.is_active,
    );
  }

  @Post('email-exists')
  userWithEmailExists(@Body() body: { email: string }) {
    return this.usersService.userWithEmailExists(body.email);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
