import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateReservationDto {

 
 
  @IsDateString({
    strict:false
  })
  startDate :Date;
  @IsDateString({
    strict:false
  })
  endDate   :Date;
  @IsString()
  @IsNotEmpty()
  placeId   :string;
  @IsString()
  @IsNotEmpty()
  invoiceId :string;
}
