import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from '../entities/book.entity';
import { CreateBookInput } from '../../graphql/books/inputs/create-book.input';
import { UpdateBookInput } from '../../graphql/books/inputs/update-book.input';
import { AuthorEntity } from '../../authors/entities/author.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly booksRepository: Repository<BookEntity>,
    @InjectRepository(AuthorEntity)
    private readonly authorsRepository: Repository<AuthorEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>
  ) {}

  findAll(): Promise<BookEntity[]> {
    return this.booksRepository.find({ relations: ['author', 'category'] });
  }

  findOne(id: number): Promise<BookEntity> {
    return this.booksRepository.findOne({ where: { id }, relations: ['author', 'category'] });
  }

  async create(createBookInput: CreateBookInput): Promise<BookEntity> {
    const newBook = this.booksRepository.create(createBookInput);
    return this.booksRepository.save(newBook);
  }

  async update(id: number, updateBookInput: UpdateBookInput): Promise<BookEntity> {
    const book = await this.booksRepository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }


    await this.booksRepository.update(id, {
      ...updateBookInput,
      img: updateBookInput.img ?? undefined
    });

    return this.booksRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const book = await this.booksRepository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    await this.booksRepository.remove(book);
  }

  async findByCategory(categoryId: number): Promise<BookEntity[]> {
    return this.booksRepository.find({
      where: { category: { id: categoryId } },
      relations: ['author', 'category']
    });
  }
}
