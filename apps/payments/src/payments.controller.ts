import {  Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Charges } from '@app/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargePayment } from '@app/common/dto/create-charg.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }


  
  @MessagePattern("create_charge")
  async createPayment(@Payload() data: CreateChargePayment) {
    return await this.paymentsService.createCharge(data)
  }


}
