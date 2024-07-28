import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProviderDto, GetProvidersDto } from './dto/provider.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProviderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createProviderDto: CreateProviderDto) {
    const { addresses, ...providerData } = createProviderDto;
    return this.prisma.provider.create({
      data: {
        ...providerData,
        addresses: {
          create: addresses,
        },
      },
      include: {
        addresses: true,
      },
    });
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  async findAll(getProvidersDto: GetProvidersDto) {
    const { latitude, longitude, address, page = 1, limit = 10 } = getProvidersDto;
    let providers = await this.prisma.provider.findMany({
      include: {
        addresses: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    if (address) {
      // Buscar coordenadas do endereço usando a API do OpenStreetMap
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json'
        }
      });
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        providers = providers.filter(provider => 
          provider.addresses.some(addr => 
            this.calculateDistance(parseFloat(lat), parseFloat(lon), addr.latitude, addr.longitude) <= 50
          )
        );
      }
    } else if (latitude && longitude) {
      providers = providers.filter(provider => 
        provider.addresses.some(addr => 
          this.calculateDistance(latitude, longitude, addr.latitude, addr.longitude) <= 50
        )
      );
    }

    return providers;
  }

  async findOne(id: string) {
    return this.prisma.provider.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateProviderDto: CreateProviderDto) {
    const { name, email, phone, document } = updateProviderDto;
    return this.prisma.provider.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phone,
        document,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.provider.delete({
      where: {
        id,
      },
    });
  }

  async login(email: string, password: string) {
    const provider = await this.prisma.provider.findUnique({ where: { email } });
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
