import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorsService } from './author.service';
import { AuthorEntity } from '../entities/author.entity';
import { CreateAuthorDto } from '../DTO/create-author.dto';
import { UpdateAuthorDto } from '../DTO/update-author.dto';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let repository: Repository<AuthorEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(AuthorEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    repository = module.get<Repository<AuthorEntity>>(getRepositoryToken(AuthorEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new author', async () => {
      const createAuthorDto: CreateAuthorDto = {
        name: 'J. K. Rolling',
        biography: 'john born in usa, when he has 15 years, john write your first book, and after this he never stop more',
        img: 'http://example.com/image.jpg',
      };

      const author = new AuthorEntity();
      Object.assign(author, createAuthorDto);

      jest.spyOn(repository, 'create').mockReturnValue(author);
      jest.spyOn(repository, 'save').mockResolvedValue(author);

      expect(await service.create(createAuthorDto)).toEqual(author);
    });
  });

  describe('findOne', () => {
    it('should return a author by ID', async () => {
      const author = new AuthorEntity();
      author.id = 1;
      author.name = 'J. K. Rolling';

      jest.spyOn(repository, 'findOne').mockResolvedValue(author);

      expect(await service.findOne(1)).toEqual(author);
    });
  });

  describe('update', () => {
    it('should update a author', async () => {
      const UpdateAuthorDto: UpdateAuthorDto = {
        name: 'J. K. Rolling',
        biography: 'john born in usa, when he has 15 years, john write your first book, and after this he never stop more',
        img: 'http://example.com/image.jpg',
      };

      const author = new AuthorEntity();
      author.id = 1;
      Object.assign(author, UpdateAuthorDto);

      jest.spyOn(repository, 'findOne').mockResolvedValue(author);
      jest.spyOn(repository, 'save').mockResolvedValue(author);

      expect(await service.update(1, UpdateAuthorDto)).toEqual(author);
    });
  });

  describe('delete', () => {
    it('should delete a author', async () => {
      const author = new AuthorEntity();
      author.id = 1;
      author.name = 'J. K. Rolling';

      jest.spyOn(repository, 'findOne').mockResolvedValue(author);
      jest.spyOn(repository, 'remove').mockResolvedValue(author);

      await service.remove(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.remove).toHaveBeenCalledWith(author);
    });
  });
});
