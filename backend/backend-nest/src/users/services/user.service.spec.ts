import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './user.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../DTO/create-user.dto';
import { UpdateUserDto } from '../DTO/update-user.dto';

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
    it('should create a new user', async () => {
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

      const user = new UserEntity();
      Object.assign(user, createUserDto);

      jest.spyOn(repository, 'create').mockReturnValue(user);
      jest.spyOn(repository, 'save').mockResolvedValue(user);

      expect(await service.create(createUserDto)).toEqual(user);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const user = new UserEntity();
      user.id = 1;
      user.name = 'John Doe';

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      expect(await service.findOne(1)).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'newpassword123',
        telephone: '0987654321',
        address: '456 Test Ave',
        city: 'Test City',
        state: 'TS',
        img: 'http://example.com/newimage.jpg',
        isAdmin: 1,
        updatedAt: new Date(),
      };

      const user = new UserEntity();
      user.id = 1;
      Object.assign(user, updateUserDto);

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);
      jest.spyOn(repository, 'save').mockResolvedValue(user);

      expect(await service.update(1, updateUserDto)).toEqual(user);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const user = new UserEntity();
      user.id = 1;
      user.name = 'John Doe';

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);
      jest.spyOn(repository, 'remove').mockResolvedValue(user);

      await service.remove(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.remove).toHaveBeenCalledWith(user);
    });
  });
});
