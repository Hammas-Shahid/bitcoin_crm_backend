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
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusesService } from './statuses.service';

@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusService: StatusesService) {}

  @Post()
  create(@Req() req: any, @Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto, req.user);
  }

  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @Post('filtered-statuses')
  getFilteredStatuses(
    @Body() queryFilters: { searchString: string; page: number; limit: number },
  ) {
    return this.statusService.getFilteredStatuses(
      queryFilters.searchString,
      queryFilters.page,
      queryFilters.limit,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(+id);
  }

  @Post('status-exists')
  statusExists(@Body() body: { name: string }) {
    return this.statusService.statusExists(body.name);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
    @Req() req: any,
  ) {
    return this.statusService.update(+id, updateStatusDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.remove(+id);
  }
}
