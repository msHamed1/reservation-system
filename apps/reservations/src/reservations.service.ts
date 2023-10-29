import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { timeStamp } from 'console';
import { UserDto } from '@app/common';

@Injectable()
export class ReservationsService {

  constructor(private readonly _reservationReposotory:ReservationRepository){}
   async create(createReservationDto: CreateReservationDto ,user:UserDto) {
    return await this._reservationReposotory.create(
      {...createReservationDto,
      timeStamp:new Date(),
      userId:user._id}
    );
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
