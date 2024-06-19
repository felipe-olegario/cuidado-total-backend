import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceProviderDto, UpdateServiceProviderDto } from './dto/service-provider.dto';
import { ServiceResponse } from './entities/service-provider.entity';

@Injectable()
export class ServiceProviderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceProviderDto) {
    try {
      return await this.prisma.service.create({
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
    } catch (error) {
      // Aqui você pode decidir como lidar com o erro
      console.error('Error in create service:', error);
      throw new Error('Failed to create service');
    }
  }

  async findAll(page = 1, limit = 10, orderBy: string = 'createdAt'): Promise<ServiceResponse[]> {
    try {
      const skip = (page - 1) * limit;
      return await this.prisma.service.findMany({
        skip,
        take: limit,
        orderBy: {
          [orderBy]: 'desc',
        },
        include: {
          serviceProvider: true,
        },
      });
    } catch (error) {
      console.error('Error in find all services:', error);
      throw new Error('Failed to fetch services');
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.service.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(`Error in find service with id ${id}:`, error);
      throw new Error('Service not found');
    }
  }

  async update(id: string, updateServiceDto: UpdateServiceProviderDto) {
    try {
      return await this.prisma.service.update({
        where: { id },
        data: {
          name: updateServiceDto.name,
          description: updateServiceDto.description,
          price: updateServiceDto.price,
          duration: updateServiceDto.duration,
          serviceProviderId: updateServiceDto.serviceProviderId,
          valueMeter: updateServiceDto.valueMeter || 0,
          valueHour: updateServiceDto.valueHour || 0,
          valueConvenient: updateServiceDto.valueConvenient || 0,
        },
      });
    } catch (error) {
      console.error(`Error in update service with id ${id}:`, error);
      throw new Error('Failed to update service');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.service.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(`Error in delete service with id ${id}:`, error);
      throw new Error('Failed to delete service');
    }
  }
}
