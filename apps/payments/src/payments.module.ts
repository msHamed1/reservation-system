import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'
import { LoggerModule, NOTIFICATION_SERVICE } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'apps/payments/.env',
      validationSchema:Joi.object({
        STRIPE_PUBLIC_KEY: Joi.string().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
    })
    }),
    LoggerModule,
    ClientsModule.register([{
      name:NOTIFICATION_SERVICE,transport:Transport.TCP,options:{
        host:'0.0.0.0',
        port:3005
      }
    }])
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
