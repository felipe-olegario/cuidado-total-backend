import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceProvider } from './entities/provider.entity';

@Injectable()
export class ProviderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProviderDto: ServiceProvider) {
    const { name, email, phone, street, number, postalCode, document } = createProviderDto;
    return this.prisma.serviceProvider.create({
      data: {
        name,
        email,
        phone,
        street,
        number,
        postalCode,
        document,
      },
    });
  }

  async findAll() {
    return this.prisma.serviceProvider.findMany();
  }

  async findOne(id: string) {
    return this.prisma.serviceProvider.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateProviderDto: ServiceProvider) {
    const { name, email, phone, street, number, postalCode, document } = updateProviderDto;
    return this.prisma.serviceProvider.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phone,
        street,
        number,
        postalCode,
        document,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.serviceProvider.delete({
      where: {
        id,
      },
    });
  }
}
