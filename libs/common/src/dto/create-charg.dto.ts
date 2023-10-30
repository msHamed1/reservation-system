import { Charges } from "@app/common";
import { IsEmail, isNotEmpty } from "class-validator";

export class CreateChargePayment extends Charges{
    @IsEmail()
    email:string

}