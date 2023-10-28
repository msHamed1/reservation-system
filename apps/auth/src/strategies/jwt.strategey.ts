import {  Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { ExtractJwt } from "passport-jwt";
import { Request } from "express";
import { TokenPayload } from "../interfaces/token-payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor( 
      private readonly  configService:ConfigService,
      private readonly  userService:UsersService
    ){
        super({
            jwtFromRequest:ExtractJwt.fromExtractors([
                (_:any)=>{ 
                    return _?.cookies?.Authentication // from noraml http will check for the cookie
                || _?.Authentication // From RPC there is no cookie 
            }
            ]),
            secretOrKey:configService.get('SECRET_KEY')
        })
    }

    async validate({userId}:TokenPayload){
        return  this.userService.getUser({_id:userId})

    }
}