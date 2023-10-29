import {  Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Charges } from '@app/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }


  
  @MessagePattern("create_charge")
  async createPayment(@Payload() data: Charges) {
    return await this.paymentsService.createCharge(data)
  }


}
