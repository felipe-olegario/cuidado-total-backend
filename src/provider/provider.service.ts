import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProviderDtoType } from './dto/provider.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProviderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createProviderDto: CreateProviderDtoType) {
    const { name, email, phone, street, number, postalCode, document, password } = createProviderDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.serviceProvider.create({
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
    return this.prisma.serviceProvider.findMany();
  }

  async findOne(id: string) {
    return this.prisma.serviceProvider.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateProviderDto: CreateProviderDtoType) {
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

  async login(email: string, password: string) {
    const provider = await this.prisma.serviceProvider.findUnique({ where: { email } });
    if (!provider) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordValid = await bcrypt.compare(password, provider.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: provider.email, sub: provider.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
