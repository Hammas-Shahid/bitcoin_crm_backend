import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateDispositionDto } from './dto/create-disposition.dto';
import { UpdateDispositionDto } from './dto/update-disposition.dto';
import { UserRoles } from 'src/users/entities/user.entity';
import { DispositionsService } from './dispositions.service';

@Controller('dispositions')
export class DispositionsController {
  constructor(private readonly dispositionService: DispositionsService) {}

  @Post()
  create(@Req() req: any, @Body() createDispositionDto: CreateDispositionDto) {
    return this.dispositionService.create(createDispositionDto, req.user);
  }

  @Get()
  findAll() {
    return this.dispositionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dispositionService.findOne(+id);
  }

  @Post('disposition-exists')
  dispositionExists(@Body() body: { name: string }) {
    return this.dispositionService.dispositionExists(body.name);
  }

  @Post('filtered-dispositions')
  getFilteredDispositions(
    @Body() queryFilters: { searchString: string; page: number; limit: number },
  ) {
    return this.dispositionService.getFilteredDispositions(
      queryFilters.searchString,
      queryFilters.page,
      queryFilters.limit,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDispositionDto: UpdateDispositionDto,
    @Req() req: any,
  ) {
    return this.dispositionService.update(+id, updateDispositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dispositionService.remove(+id);
  }
}
