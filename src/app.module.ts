import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProviderModule } from './provider/provider.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceProviderModule } from './service-provider/service-provider.module';
import { ContractorModule } from './contractor/contractor.module';
import { AvailabilityModule } from './availability/availability.module';

@Module({
  imports: [ProviderModule, PrismaModule, ServiceProviderModule, ContractorModule, AvailabilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
