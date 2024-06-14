import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../DTO/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOne(+id);
  }

  @Post()
  async create(@Body() CreateUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(CreateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
