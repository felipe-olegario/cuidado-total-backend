import { Module } from '@nestjs/common';
import { ServiceProviderService } from './service-provider.service';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceProviderController } from './service-provider.controller';

@Module({
  controllers: [ServiceProviderController],
  providers: [ServiceProviderService, PrismaService],
})
export class ServiceProviderModule {}
