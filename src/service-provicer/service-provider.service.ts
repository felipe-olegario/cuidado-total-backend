import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceProviderDto, UpdateServiceProviderDto } from './dto/service-provider.dto';

@Injectable()
export class ServiceProviderService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createServiceDto: CreateServiceProviderDto) {
    return this.prisma.service.create({
      data: {
        name: createServiceDto.name,
        description: createServiceDto.description,
        price: createServiceDto.price,
        duration: createServiceDto.duration,
        serviceProviderId: createServiceDto.serviceProviderId,
        valueMeter: createServiceDto.valueMeter || 0,
        valueHour: createServiceDto.valueHour || 0,
        valueConvenient: createServiceDto.valueConvenient || 0,
      },
    });
  }
  

  async findAll() {
    return this.prisma.service.findMany();
  }

  async findOne(id: string) {
    return this.prisma.service.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateServiceDto: UpdateServiceProviderDto) {
    return this.prisma.service.update({
      where: { id },
      data: {
        name: updateServiceDto.name,
        description: updateServiceDto.description,
        price: updateServiceDto.price,
        duration: updateServiceDto.duration,
        serviceProviderId: updateServiceDto.serviceProviderId,
        valueMeter: updateServiceDto.valueMeter || 0, // Exemplo de valor padrão opcional
        valueHour: updateServiceDto.valueHour || 0,   // Exemplo de valor padrão opcional
        valueConvenient: updateServiceDto.valueConvenient || 0, // Exemplo de valor padrão opcional
      },
    });
  }

  async remove(id: string) {
    return this.prisma.service.delete({
      where: {
        id,
      },
    });
  }
}
