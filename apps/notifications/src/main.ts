import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationsModule,{
    transport:Transport.TCP,
    options:{
      host:'0.0.0.0',
      port:3005,
    }
  });
  app.useLogger(app.get(Logger))
  await app.listen();
}
bootstrap();
