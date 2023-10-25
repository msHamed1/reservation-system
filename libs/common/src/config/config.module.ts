import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';

import * as Joi from 'joi'

@Module({
  imports:[NestConfigModule.forRoot({
    validationSchema:Joi.object({
      MONGO_DB_URI:Joi.string().required()
    })
  })], // Load any env file in memory or read any .env file 
  providers:[ConfigService],
  exports:[ConfigService]
})
export class ConfigModule {}
