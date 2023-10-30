import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
 

  async sendNotification (email: string){
console.log(email)
  }
}
