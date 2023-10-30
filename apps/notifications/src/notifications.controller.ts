import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern("SEND_NOTIFICATIONS")
  async sendNotifications(@Payload() data:any){
    console.log(data)
    

  }
}
