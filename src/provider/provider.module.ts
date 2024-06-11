import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { ServiceProvider } from './entities/provider.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProviderController],
  providers: [ProviderService, PrismaService],
})
export class ProviderModule {}
