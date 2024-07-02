import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAvailabilityDto, AvailabilityResponseDto } from './dto/availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  async createAvailability(dto: CreateAvailabilityDto): Promise<AvailabilityResponseDto> {
    const availability = await this.prisma.availability.create({
      data: {
        providerId: dto.providerId,
        date: new Date(dto.date),
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
      },
    });

    return this.toAvailabilityResponseDto(availability);
  }

  async getAvailabilityByProvider(providerId: string, date: string): Promise<AvailabilityResponseDto[]> {
    const availabilities = await this.prisma.availability.findMany({
      where: {
        providerId,
        date: new Date(date),
      },
    });

    return availabilities.map(this.toAvailabilityResponseDto);
  }

  private toAvailabilityResponseDto(availability: any): AvailabilityResponseDto {
    return {
      id: availability.id,
      providerId: availability.providerId,
      date: availability.date.toISOString(),
      startTime: availability.startTime.toISOString(),
      endTime: availability.endTime.toISOString(),
      createdAt: availability.createdAt.toISOString(),
      updatedAt: availability.updatedAt.toISOString(),
    };
  }
}
