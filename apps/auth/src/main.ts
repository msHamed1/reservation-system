import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as Cookie from 'cookie-parser'
import { Transport } from '@nestjs/microservices';

async function bootstrap() {

  // this an hybird app one on port 3001 listen to HTTP requests and act as microservices on port 3002
  const app = await NestFactory.create(AuthModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port:3002,
    },
  });
  
  app.use(Cookie())
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))
  app.useLogger(app.get(Logger))
 app.startAllMicroservices()
 await app.listen(3001);
}
bootstrap();
