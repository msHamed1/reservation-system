import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from '@app/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from "joi"
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategey';

@Module({
  imports: [UsersModule ,LoggerModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'apps/auth/.env',
      validationSchema:Joi.object({
        SECRET_KEY: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
      })
      })
    ,JwtModule.registerAsync({
    useFactory:(configService:ConfigService)=>({
      secret:configService.get<string>("SECRET_KEY"),
      signOptions:{expiresIn:`${configService.get("JWT_EXPIRATION")}s`}
    }),
    inject:[ConfigService]
  }),
 ],
  controllers: [AuthController],
  providers: [AuthService ,LocalStrategy,JwtStrategy],
})
export class AuthModule {}
