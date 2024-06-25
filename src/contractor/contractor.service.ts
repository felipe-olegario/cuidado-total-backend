import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContractorDto, UpdateContractorDto } from './dto/contractor.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ContractorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContractorDto: CreateContractorDto) {
    const { name, email, phone, street, number, postalCode, document, password } = createContractorDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.contractor.create({
      data: {
        name,
        email,
        phone,
        street,
        number,
        postalCode,
        document,
        password: hashedPassword,
      },
    });
  }

  async findAll() {
    return this.prisma.contractor.findMany();
  }

  async findOne(id: string) {
    return this.prisma.contractor.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateContractorDto: UpdateContractorDto) {
    return this.prisma.contractor.update({
      where: {
        id,
      },
      data: {
        ...updateContractorDto,
        password: updateContractorDto.password ? await bcrypt.hash(updateContractorDto.password, 10) : undefined,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.contractor.delete({
      where: {
        id,
      },
    });
  }
}
