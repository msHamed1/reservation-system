import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PaymentsModule,{
    transport:Transport.TCP,
    options:{
      host:'0.0.0.0',
      port:3004
    }
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))

  app.useLogger(app.get(Logger))
  await app.listen();
}
bootstrap();
