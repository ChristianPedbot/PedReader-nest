import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksService } from './book.service';
import { BookEntity } from '../entities/book.entity';
import { AuthorEntity } from '../../authors/entities/author.entity';
import { CreateBookDto } from '../DTO/create-book.dto';
import { UpdateBookDto } from '../DTO/update-book.dto';

describe('BooksService', () => {
  let service: BooksService;
  let bookRepository: Repository<BookEntity>;
  let authorRepository: Repository<AuthorEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(BookEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(AuthorEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookRepository = module.get<Repository<BookEntity>>(getRepositoryToken(BookEntity));
    authorRepository = module.get<Repository<AuthorEntity>>(getRepositoryToken(AuthorEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Harry Tester',
        description: 'A book with the greatest number of these possible',
        availability: 0,
        date: new Date(),
        img: 'http://example.com/image.jpg',
        authorId: 1
      };

      const book = new BookEntity();
      Object.assign(book, createBookDto);

      const author = new AuthorEntity();
      author.id = 1;

      jest.spyOn(bookRepository, 'create').mockReturnValue(book);
      jest.spyOn(bookRepository, 'save').mockResolvedValue(book);
      jest.spyOn(authorRepository, 'findOne').mockResolvedValue(author);

      expect(await service.create(createBookDto)).toEqual(book);
    });
  });

  describe('findOne', () => {
    it('should return a book by ID', async () => {
      const book = new BookEntity();
      book.id = 1;
      book.title = 'Harry Tester';

      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(book);

      expect(await service.findOne(1)).toEqual(book);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const updateBookDto: UpdateBookDto = {
        title: 'Harry Tester',
        description: 'A book with the lowest number of these possible',
        availability: 1,
        date: new Date(),
        img: 'http://example.com/image.jpg',
        authorId: 1
      };

      const book = new BookEntity();
      book.id = 1;
      Object.assign(book, updateBookDto);

      const author = new AuthorEntity();
      author.id = 1;

      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(book);
      jest.spyOn(bookRepository, 'save').mockResolvedValue(book);
      jest.spyOn(authorRepository, 'findOne').mockResolvedValue(author);

      expect(await service.update(1, updateBookDto)).toEqual(book);
    });
  });

  describe('delete', () => {
    it('should delete a book', async () => {
      const book = new BookEntity();
      book.id = 1;
      book.title = 'Harry Tester';

      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(book);
      jest.spyOn(bookRepository, 'remove').mockResolvedValue(book);

      await service.remove(1);

      expect(bookRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(bookRepository.remove).toHaveBeenCalledWith(book);
    });
  });
});
