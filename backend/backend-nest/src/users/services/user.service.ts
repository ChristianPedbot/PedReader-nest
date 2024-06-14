import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../DTO/update-user.dto';
import { CreateUserDto } from '../DTO/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { name, email, password, telephone, address, city, state , img, isAdmin, createdAt, updatedAt } = createUserDto;
    const newUser = this.userRepository.create({ name,  email, password, telephone, address, city, state , img, isAdmin, createdAt, updatedAt});
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const { name,  email, password, telephone, address, city, state , img, isAdmin, createdAt, updatedAt} = updateUserDto;

    const userToUpdate = await this.userRepository.findOne({ where: { id } });
    if (!userToUpdate) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }

    userToUpdate.name = name || userToUpdate.name;
    userToUpdate.email = email || userToUpdate.email;
    userToUpdate.password = password || userToUpdate.password;
    userToUpdate.address = address || userToUpdate.address;
    userToUpdate.city = city || userToUpdate.city;
    userToUpdate.state = state || userToUpdate.state;
    userToUpdate.img = img || userToUpdate.img;
    userToUpdate.isAdmin = isAdmin || userToUpdate.isAdmin;
    userToUpdate.createdAt = createdAt || userToUpdate.createdAt;
    userToUpdate.updatedAt = updatedAt || userToUpdate.updatedAt;

    return await this.userRepository.save(userToUpdate);
  }

  async remove(id: number): Promise<void> {
    const userToRemove = await this.userRepository.findOne({ where: { id } });

    if (!userToRemove) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }

    await this.userRepository.remove(userToRemove);
  }
}
