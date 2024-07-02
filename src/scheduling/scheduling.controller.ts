import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { CreateSchedulingDto, SchedulingResponseDto, UpdateSchedulingDto } from './dto/scheduling.dto';

@Controller('scheduling')
export class SchedulingController {
  constructor(private schedulingService: SchedulingService) {}

  @Post()
  async create(@Body() createSchedulingDto: CreateSchedulingDto): Promise<SchedulingResponseDto> {
    return this.schedulingService.createScheduling(createSchedulingDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<SchedulingResponseDto> {
    return this.schedulingService.getSchedulingById(id);
  }

  @Get()
  async getAll(): Promise<SchedulingResponseDto[]> {
    return this.schedulingService.getAllSchedulings();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSchedulingDto: UpdateSchedulingDto): Promise<SchedulingResponseDto> {
    return this.schedulingService.updateScheduling(id, updateSchedulingDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.schedulingService.deleteScheduling(id);
  }
}
