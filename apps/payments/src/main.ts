import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PaymentsModule,{
    transport:Transport.TCP,
    options:{
      host:'0.0.0.0',
      port:3003
    }
  });
  app.useLogger(app.get(Logger))
}
bootstrap();
