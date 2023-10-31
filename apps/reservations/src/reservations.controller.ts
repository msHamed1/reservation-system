import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CurrentUser, JwtAuthGuard, Roles } from '@app/common';
import { UserDto } from '@app/common/dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createReservationDto: CreateReservationDto ,@CurrentUser() currentUser:UserDto) {
    return await this.reservationsService.create(createReservationDto ,currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Get()
  async findAll() {
    return await this.reservationsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reservationsService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return await this.reservationsService.update(id, updateReservationDto);
  }
  @UseGuards(JwtAuthGuard)
  
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.reservationsService.remove(id);
  }
}
