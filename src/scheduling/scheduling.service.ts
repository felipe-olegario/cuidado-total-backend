import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSchedulingDto, SchedulingResponseDto, UpdateSchedulingDto } from './dto/scheduling.dto';

@Injectable()
export class SchedulingService {
  constructor(private prisma: PrismaService) {}

  async createScheduling(dto: CreateSchedulingDto): Promise<SchedulingResponseDto> {
    // Verificar disponibilidade
    const availability = await this.prisma.availability.findFirst({
      where: {
        providerId: dto.serviceProviderId,
        date: new Date(dto.scheduledDate),
        startTime: { lte: new Date(dto.startTime) },
        endTime: { gte: new Date(dto.endTime) },
      },
    });

    if (!availability) {
      throw new NotFoundException('Horário não disponível');
    }

    // Criar agendamento
    const scheduling = await this.prisma.scheduling.create({
      data: {
        serviceProviderId: dto.serviceProviderId,
        contractorId: dto.contractorId,
        serviceId: dto.serviceId,
        scheduledDate: new Date(dto.scheduledDate),
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
      },
    });

    // Atualizar disponibilidade
    await this.updateAvailability(availability, dto.startTime, dto.endTime);

    return this.toSchedulingResponseDto(scheduling);
  }

  async getSchedulingById(id: string): Promise<SchedulingResponseDto> {
    const scheduling = await this.prisma.scheduling.findUnique({ where: { id } });
    if (!scheduling) {
      throw new NotFoundException('Agendamento não encontrado');
    }
    return this.toSchedulingResponseDto(scheduling);
  }

  async getAllSchedulings(): Promise<SchedulingResponseDto[]> {
    const schedulings = await this.prisma.scheduling.findMany();
    return schedulings.map(this.toSchedulingResponseDto);
  }

  async updateScheduling(id: string, dto: UpdateSchedulingDto): Promise<SchedulingResponseDto> {
    const scheduling = await this.prisma.scheduling.update({
      where: { id },
      data: {
        ...dto,
        scheduledDate: dto.scheduledDate ? new Date(dto.scheduledDate) : undefined,
        startTime: dto.startTime ? new Date(dto.startTime) : undefined,
        endTime: dto.endTime ? new Date(dto.endTime) : undefined,
      },
    });
    return this.toSchedulingResponseDto(scheduling);
  }

  async deleteScheduling(id: string): Promise<void> {
    await this.prisma.scheduling.delete({ where: { id } });
  }

  private async updateAvailability(availability: any, startTime: string, endTime: string): Promise<void> {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (availability.startTime.getTime() === start.getTime() && availability.endTime.getTime() === end.getTime()) {
      // Remover disponibilidade se o horário coincide exatamente com o agendamento
      await this.prisma.availability.delete({ where: { id: availability.id } });
    } else if (availability.startTime.getTime() === start.getTime()) {
      // Ajustar horário de início da disponibilidade
      await this.prisma.availability.update({
        where: { id: availability.id },
        data: { startTime: end },
      });
    } else if (availability.endTime.getTime() === end.getTime()) {
      // Ajustar horário de fim da disponibilidade
      await this.prisma.availability.update({
        where: { id: availability.id },
        data: { endTime: start },
      });
    } else {
      // Dividir a disponibilidade em duas
      await this.prisma.availability.update({
        where: { id: availability.id },
        data: { endTime: start },
      });

      await this.prisma.availability.create({
        data: {
          providerId: availability.providerId,
          date: availability.date,
          startTime: end,
          endTime: availability.endTime,
        },
      });
    }
  }

  private toSchedulingResponseDto(scheduling: any): SchedulingResponseDto {
    return {
      id: scheduling.id,
      serviceProviderId: scheduling.serviceProviderId,
      contractorId: scheduling.contractorId,
      serviceId: scheduling.serviceId,
      scheduledDate: scheduling.scheduledDate.toISOString(),
      startTime: scheduling.startTime.toISOString(),
      endTime: scheduling.endTime.toISOString(),
      createdAt: scheduling.createdAt.toISOString(),
      updatedAt: scheduling.updatedAt.toISOString(),
    };
  }
}
