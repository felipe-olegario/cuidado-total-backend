import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  const config = new DocumentBuilder()
    .setTitle('Cuidado Total')
    .setDescription('...')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const HOST = process.env.HOST || '127.0.0.1';
  const PORT = Number(process.env.PORT) || 3000;
  app.enableCors({ origin: [/^(.*)/] });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, HOST, () => {
    console.log(`Listening on: ${HOST}:${PORT}`);
  });
}

bootstrap();
