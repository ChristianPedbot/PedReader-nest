import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './location.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LocationEntity } from '../entities/location.entity';
import { BookEntity } from '../../books/entities/book.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { CreateLocationDto } from '../DTO/create-location.dto';
import { UpdateLocationDto } from '../DTO/update-location.dto';
import { NotFoundException } from '@nestjs/common';

describe('LocationsService', () => {
  let service: LocationsService;
  let locationRepositoryMock: any;
  let bookRepositoryMock: any;
  let userRepositoryMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService,
        {
          provide: getRepositoryToken(LocationEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(BookEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
    locationRepositoryMock = module.get(getRepositoryToken(LocationEntity));
    bookRepositoryMock = module.get(getRepositoryToken(BookEntity));
    userRepositoryMock = module.get(getRepositoryToken(UserEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new location', async () => {
      const createLocationDto: CreateLocationDto = {
        bookId: 1,
        userId: 1,
        return_date: new Date(),
      };

      const mockLocation = new LocationEntity();
      mockLocation.book = {} as BookEntity;
      mockLocation.user = {} as UserEntity;

      jest.spyOn(bookRepositoryMock, 'findOne').mockResolvedValueOnce({ id: 1 } as BookEntity);
      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValueOnce({ id: 1 } as UserEntity);
      jest.spyOn(bookRepositoryMock, 'save').mockResolvedValueOnce({} as BookEntity);
      jest.spyOn(locationRepositoryMock, 'create').mockReturnValue(mockLocation);
      jest.spyOn(locationRepositoryMock, 'save').mockResolvedValueOnce(mockLocation);

      const result = await service.create(createLocationDto);
      expect(result).toEqual(mockLocation);
    });

    it('should throw NotFoundException when book not found', async () => {
      const createLocationDto: CreateLocationDto = {
        bookId: 999, 
        userId: 1,
        return_date: new Date(),
      };

      jest.spyOn(bookRepositoryMock, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.create(createLocationDto)).rejects.toThrowError(NotFoundException);
    });
  });
});
