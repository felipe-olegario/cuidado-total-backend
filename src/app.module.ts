import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProviderModule } from './provider/provider.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceProviderModule } from './service-provicer/service-provider.module';

@Module({
  imports: [ProviderModule, PrismaModule, ServiceProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
