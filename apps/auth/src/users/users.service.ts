import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';

import * as Crybt from "bcrypt"

@Injectable()
export class UsersService {


    constructor(private readonly userRepository: UserRepository){}


    async create (createUserDto: CreateUserDto){

        console.log("DTO",createUserDto)
          return this.userRepository.create({
            ...createUserDto,
            password:await Crybt.hash(createUserDto.password, 10)
          })
    }


    async validate (email: string,password: string){

        const user = await this.userRepository.findOne({email})
       

        const userPass = await Crybt.compare(password,user.password)
       
        if(!userPass){
            throw new UnauthorizedException("User not valid ")
        }
    
        return user;
        

    }
  
}
