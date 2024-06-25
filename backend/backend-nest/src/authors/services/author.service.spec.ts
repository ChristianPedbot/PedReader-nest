import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './author.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { Repository, DeleteResult } from 'typeorm'; 
import { CreateAuthorDto } from '../DTO/create-author.dto';
import { UpdateAuthorDto } from '../DTO/update-author.dto';
import { NotFoundException } from '@nestjs/common';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let repositoryMock: Repository<AuthorEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(AuthorEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    repositoryMock = module.get<Repository<AuthorEntity>>(getRepositoryToken(AuthorEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('remove', () => {
    it('should remove an existing author', async () => {
      const authorId = 1;

      const deleteResult: DeleteResult = { raw: {}, affected: 1 }; 
      jest.spyOn(repositoryMock, 'delete').mockResolvedValueOnce(deleteResult);

      await service.remove(authorId);

      expect(repositoryMock.delete).toHaveBeenCalledWith(authorId);
    });
  });

  describe('ensureDefaultAuthor', () => {
    it('should create a default author if no authors exist', async () => {
      jest.spyOn(repositoryMock, 'count').mockResolvedValueOnce(0); 
      jest.spyOn(service, 'create').mockResolvedValueOnce({} as AuthorEntity); 

      await service.ensureDefaultAuthor();

      expect(repositoryMock.count).toHaveBeenCalledWith(); 
      expect(service.create).toHaveBeenCalledWith({
        name: 'Default Author Name',
        biography: 'This is a default author biography.',
        img: 'default-image-url',
      }); 
    });

    it('should not create a default author if authors exist', async () => {
      jest.spyOn(repositoryMock, 'count').mockResolvedValueOnce(1); 
      const createSpy = jest.spyOn(service, 'create');
      await service.ensureDefaultAuthor();

      expect(repositoryMock.count).toHaveBeenCalledWith(); 
      expect(createSpy).not.toHaveBeenCalled(); 
    });
  });

});
