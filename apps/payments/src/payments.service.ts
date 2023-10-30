import { Charges, NOTIFICATION_SERVICE } from '@app/common';
import { CreateChargePayment } from '@app/common/dto/create-charg.dto';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { string } from 'joi';
import {Stripe} from "stripe"
@Injectable()
export class PaymentsService {

  private stripe = new Stripe(this.configService.get("STRIPE_SECRET_KEY"),{
    apiVersion:'2023-10-16'
  })


  constructor(private readonly configService :ConfigService,
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService:ClientProxy
    ){}

  async createCharge ({amount,email }:CreateChargePayment){
  
    const paymentIntent= await this.stripe.paymentIntents.create({
      payment_method:'pm_card_visa',
      amount:amount*100,
      confirm:true,
      currency:"usd",
     return_url: 'https://example.com/return_url',
    }).catch(er=>{
      throw new InternalServerErrorException("Error with Stripe payment intent",er)
    });
    this.notificationService.emit("SEND_NOTIFICATIONS",{
      email:email
    })
    
    return paymentIntent
  }
}
