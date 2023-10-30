import { Charges } from '@app/common';
import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsDefined, IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested, isNotEmptyObject } from "class-validator";

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

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(()=> Charges)
  charge:Charges;

}
