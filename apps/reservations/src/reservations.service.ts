import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { timeStamp } from 'console';
import { PAYMENT_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map } from 'rxjs';

@Injectable()
export class ReservationsService {

  constructor(private readonly _reservationReposotory:ReservationRepository ,
    @Inject(PAYMENT_SERVICE) private readonly _paymentClient:ClientProxy){}
   async create(createReservationDto: CreateReservationDto ,user:UserDto) {

    return this._paymentClient.send('create_charge',{
      ...createReservationDto.charge,
      email:user.email
    })
    .pipe(
      map(async (res)=>{
        return await this._reservationReposotory.create(
          {...createReservationDto,
          invoiceId:res.id,
          timeStamp:new Date(),
          userId:user._id}
        );
      }),
      catchError((er)=>{
      
       throw new InternalServerErrorException("Error with Payment service please try again")
      })
    )
  
  }

  async findAll() {
    return  await this._reservationReposotory.find({})
  }

  async  findOne(id: string) {
    return await this._reservationReposotory.findOne({_id:id})
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    return  await this._reservationReposotory.findOrUpdate({_id:id},{
      $set: updateReservationDto
    })
  }

  async remove(id: string) {
    return await this._reservationReposotory.findOneAndDelete({_id:id})
  }
}
