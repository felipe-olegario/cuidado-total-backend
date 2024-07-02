import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto, AvailabilityResponseDto } from './dto/availability.dto';

@Controller('availability')
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @Post()
  async create(@Body() createAvailabilityDto: CreateAvailabilityDto): Promise<AvailabilityResponseDto> {
    return this.availabilityService.createAvailability(createAvailabilityDto);
  }

  @Get()
  async getByProvider(
    @Query('providerId') providerId: string,
    @Query('date') date: string,
  ): Promise<AvailabilityResponseDto[]> {
    return this.availabilityService.getAvailabilityByProvider(providerId, date);
  }
}
