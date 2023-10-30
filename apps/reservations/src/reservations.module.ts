import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, AUTH_service, LoggerModule, PAYMENT_SERVICE } from '@app/common';
import { ReservationRepository } from './reservation.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { ConfigModule } from '@nestjs/config';
import * as Joi from "joi"
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports:[ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'apps/reservations/.env',
    validationSchema:Joi.object({
      MONGO_DB_URI: Joi.string().required()
    })
    }),DatabaseModule,DatabaseModule.forFeature([{name:ReservationDocument.name,schema:ReservationSchema}]),
  LoggerModule,
  ClientsModule.register([
    {name:AUTH_service,transport:Transport.TCP, options:{
      host:'0.0.0.0',
      port:3002
    }},
    {
      name:PAYMENT_SERVICE,transport:Transport.TCP,options:{
         host:"0.0.0.0",
         port:3004
      }
    }
  ])
  
],
  controllers: [ReservationsController],
  providers: [ReservationsService,ReservationRepository],
  
})
export class ReservationsModule {}
