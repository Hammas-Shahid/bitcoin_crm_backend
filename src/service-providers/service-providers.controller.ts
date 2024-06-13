import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ServiceProvidersService } from './service-providers.service';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';

@Controller('service-providers')
export class ServiceProvidersController {
  constructor(private readonly serviceProvidersService: ServiceProvidersService) {}

  @Post()
  create(
    @Body() createServiceProviderDto: CreateServiceProviderDto,
    @Req() req: any,
  ) {
    return this.serviceProvidersService.create(createServiceProviderDto, req.user);
  }

  @Get()
  findAll() {
    return this.serviceProvidersService.findAll();
  }

  @Post('filtered-providers')
  getFilteredBusinessTypes(
    @Body() queryFilters: { searchString: string; page: number; limit: number },
  ) {
    return this.serviceProvidersService.getFilteredProviders(
      queryFilters.searchString,
      queryFilters.page,
      queryFilters.limit,
    );
  }

  @Post('provider-exists')
  providerExists(@Body() body: { name: string }) {
    return this.serviceProvidersService.providerExists(body.name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceProvidersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceProviderDto: UpdateServiceProviderDto,
  ) {
    return this.serviceProvidersService.update(+id, updateServiceProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceProvidersService.remove(+id);
  }
}
