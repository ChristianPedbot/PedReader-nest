import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UsersService } from './user.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../DTO/create-user.dto';
import { UpdateUserDto } from '../DTO/update-user.dto';
import * as bcrypt from 'bcrypt';


jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user with hashed password', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        telephone: '1234567890',
        address: '123 Test St',
        city: 'Test City',
        state: 'TS',
        img: 'http://example.com/image.jpg',
        isAdmin: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const hashedPassword = 'hashedpassword123';
      const user = new UserEntity();
      Object.assign(user, createUserDto, { password: hashedPassword });

      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      jest.spyOn(repository, 'create').mockReturnValue(user);
      jest.spyOn(repository, 'save').mockResolvedValue(user);

      const result = await service.create(createUserDto);

      expect(result).toEqual(user);
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(repository.create).toHaveBeenCalledWith(expect.objectContaining({ password: hashedPassword }));
      expect(repository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const user = new UserEntity();
      user.id = 1;
      user.name = 'John Doe';

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.findOne(1);

      expect(result).toEqual(user);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });


  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'John Doe Updated',
        email: 'johnupdated@example.com',
        telephone: '0987654321',
        address: '456 Test St',
        city: 'Updated City',
        state: 'UT',
        img: 'http://example.com/updatedimage.jpg',
        isAdmin: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const existingUser = new UserEntity();
      existingUser.id = 1;
      existingUser.name = 'John Doe';
      existingUser.email = 'john@example.com';


      const updatedUser = { ...existingUser, ...updateUserDto };

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashednewpassword123');
      jest.spyOn(repository, 'findOne').mockResolvedValue(existingUser);
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as UpdateResult);
      jest.spyOn(repository, 'findOne').mockResolvedValue(updatedUser);

      const result = await service.update(1, updateUserDto);

      expect(result).toEqual(updatedUser);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
     
    });



  describe('delete', () => {
    it('should delete a user', async () => {
      const user = new UserEntity();
      user.id = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

      await service.remove(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
  
})});
