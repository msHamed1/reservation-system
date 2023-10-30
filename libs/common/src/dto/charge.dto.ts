import { IsCreditCard, IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, ValidateNested } from "class-validator";
import Stripe from "stripe";
import { Card } from "./card.dto";
import { Type } from "class-transformer";

export class Charges {

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(()=>Card)
    card        :Card

    @IsNotEmpty()
    @IsNumber()
    amount      :number
}