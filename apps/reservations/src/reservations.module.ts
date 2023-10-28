import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationRepository } from './reservation.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { ConfigModule } from '@nestjs/config';
import * as Joi from "joi"

@Module({
  imports:[ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'apps/reservations/.env',
    validationSchema:Joi.object({
      MONGO_DB_URI: Joi.string().required()
    })
    }),DatabaseModule,DatabaseModule.forFeature([{name:ReservationDocument.name,schema:ReservationSchema}]),
  LoggerModule,
  
],
  controllers: [ReservationsController],
  providers: [ReservationsService,ReservationRepository],
})
export class ReservationsModule {}
