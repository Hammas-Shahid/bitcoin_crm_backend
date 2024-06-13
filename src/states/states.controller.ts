import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { StatesService } from './states.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './entities/state.entity';

@Controller('states')
export class StatesController {
  constructor(private readonly stateService: StatesService) {}

  @Post()
  create(
    @Body() createStateDto: CreateStateDto,
    @Req() req: any,
  ): Promise<State> {
    return this.stateService.create(createStateDto, req.user);
  }

  @Get()
  findAll(): Promise<State[]> {
    return this.stateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<State> {
    return this.stateService.findOne(id);
  }

  @Post('filtered-states')
  getFilteredStates(
    @Body() queryFilters: { searchString: string; page: number; limit: number },
  ) {
    return this.stateService.getFilteredstates(
      queryFilters.searchString,
      queryFilters.page,
      queryFilters.limit,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateStateDto: UpdateStateDto,
    @Req() req: any
  ): Promise<State> {
    return this.stateService.update(id, updateStateDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.stateService.remove(id);
  }
}
