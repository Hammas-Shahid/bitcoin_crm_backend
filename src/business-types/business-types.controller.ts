import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BusinessTypesService } from './business-types.service';
import { CreateBusinessTypeDto } from './dto/create-business-type.dto';
import { UpdateBusinessTypeDto } from './dto/update-business-type.dto';

@Controller('business-types')
export class BusinessTypesController {
  constructor(private readonly businessTypesService: BusinessTypesService) {}

  @Post()
  create(@Body() createBusinessTypeDto: CreateBusinessTypeDto) {
    return this.businessTypesService.create(createBusinessTypeDto);
  }

  @Get()
  findAll() {
    return this.businessTypesService.findAll();
  }

  @Post('filtered-business-types')
  getFilteredBusinessTypes(
    @Body() queryFilters: { searchString: string; page: number; limit: number },
  ) {
    return this.businessTypesService.getFilteredUsers(
      queryFilters.searchString,
      queryFilters.page,
      queryFilters.limit,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessTypeDto: UpdateBusinessTypeDto,
  ) {
    return this.businessTypesService.update(+id, updateBusinessTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessTypesService.remove(+id);
  }
}
