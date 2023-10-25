import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { timeStamp } from 'console';

@Injectable()
export class ReservationsService {

  constructor(private readonly _reservationReposotory:ReservationRepository){}
  create(createReservationDto: CreateReservationDto) {
    return this._reservationReposotory.create(
      {...createReservationDto,
      timeStamp:new Date(),
      userId:"1234"}
    );
  }

  findAll() {
    return this._reservationReposotory.find({})
  }

  findOne(id: string) {
    return this._reservationReposotory.findOne({_id:id})
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this._reservationReposotory.findOrUpdate({_id:id},{
      $set: updateReservationDto
    })
  }

  remove(id: string) {
    return this._reservationReposotory.findOneAndDelete({_id:id})
  }
}
