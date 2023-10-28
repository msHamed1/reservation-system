import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';

import * as Crybt from 'bcrypt';
import { _FilterQuery } from 'mongoose';
import { UserDocument } from './models/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateEmail(createUserDto);

    return this.userRepository.create({
      ...createUserDto,
      password: await Crybt.hash(createUserDto.password, 10),
    });
  }

  private async validateEmail(createUserDto: CreateUserDto) {
    try {
      await this.userRepository.findOne({ email: createUserDto.email });
    } catch (err) {
      return;
    }

    throw new UnprocessableEntityException(' Email is not valid ');
  }

  async validate(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });

    const userPass = await Crybt.compare(password, user.password);

    if (!userPass) {
      throw new UnauthorizedException('User not valid ');
    }

    return user;
  }

  async getUser(userId: _FilterQuery<UserDocument>) {
    try {
      return await this.userRepository.findOne(userId);
    } catch (error) {
      throw new UnauthorizedException('User not okay ');
    }
  }
}
