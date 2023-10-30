import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class Card {

    @IsNotEmpty()
    @IsString()
    cvc: string;

    @IsNotEmpty()
    @IsNumber()
    exp_month: number;

    @IsNotEmpty()
    @IsNumber()
    exp_year: number;

    @IsNotEmpty()
    @IsString()
    @IsCreditCard()
    number: string;
}