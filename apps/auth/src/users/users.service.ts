import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {


    constructor(private readonly userRepository: UserRepository){}


    async create (createUserDto: CreateUserDto){

        console.log("DTO",createUserDto)
          return this.userRepository.create(createUserDto)
    }
}
