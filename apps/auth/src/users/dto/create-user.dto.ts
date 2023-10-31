import {  ArrayNotEmpty, IsAlpha, IsArray, IsEmail, IsOptional, IsString, IsStrongPassword, isNotEmpty } from "class-validator";

export  class CreateUserDto {

        @IsEmail()
        email           :string;
        @IsStrongPassword()
        password        :string ;
        @IsString()
        user_name       :string;
        @IsOptional()
        @IsArray()
        @IsString({each:true})
        roles?:string[]
    

}