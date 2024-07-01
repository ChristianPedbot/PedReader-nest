import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../../graphql/users/inputs/create-user.input';
import { UpdateUserInput } from '../../graphql/users/inputs/update-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<UserEntity> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    const userToCreate = { ...createUserInput, password: hashedPassword };

    const user = this.usersRepository.create(userToCreate);
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<UserEntity> {
    if (updateUserInput.password) {
      updateUserInput.password = await bcrypt.hash(updateUserInput.password, 10);
    }
    await this.usersRepository.update(id, updateUserInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
