import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ServiceProviderService } from './service-provider.service';
import { CreateServiceProviderDto } from './dto/service-provider.dto';
import { ServiceResponse } from './entities/service-provider.entity';

@Controller('service-provider')
export class ServiceProviderController {
  constructor(
    private readonly serviceProviderService: ServiceProviderService,
  ) {}

  @Post()
  create(@Body() createServiceProviderDto: CreateServiceProviderDto) {
    return this.serviceProviderService.create(createServiceProviderDto);
  }

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('orderBy') orderBy: string = 'createdAt',
  ): Promise<ServiceResponse[]> {
    return this.serviceProviderService.findAll(parseInt(page), parseInt(limit), orderBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceProviderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceProviderDto: CreateServiceProviderDto) {
    return this.serviceProviderService.update(id, updateServiceProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceProviderService.remove(id);
  }

}
