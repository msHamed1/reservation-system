import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {


  constructor(private readonly cofigeService: ConfigService , private readonly jwtService: JwtService){}
 


  async logIn(user:UserDocument, response :Response){

    // get the JWT expier fron env ,

    const tokenPayload = {
      userId:user._id.toHexString(),
    }

    const expire = new Date();

    expire.setSeconds(
      expire.getSeconds() + await this.cofigeService.get('JWT_EXPIRATION')
    )
    const Token =  this.jwtService.sign(tokenPayload ,{
      secret:await this.cofigeService.get('SECRET_KEY')
    })

    response.cookie("Authentication",Token,{
      httpOnly:true,
      expires:expire
    })

   

    // generate the JWT for the user 

  }
}
