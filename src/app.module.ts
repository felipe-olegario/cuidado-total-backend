import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProviderModule } from './provider/provider.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProviderModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
