import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from '../entities/book.entity';
import { CreateBookDto } from '../DTO/create-book.dto';
import { UpdateBookDto } from '../DTO/update-book.dto';
import { AuthorEntity } from '../../authors/entities/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    @InjectRepository(AuthorEntity)
    private authorRepository: Repository<AuthorEntity>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookEntity> {
    const { authorId, ...bookData } = createBookDto;

    const author = await this.authorRepository.findOne({ where: { id: authorId } });
    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }

    const newBook = this.bookRepository.create({
      ...bookData,
      author,
    });

    return await this.bookRepository.save(newBook);
  }

  async findAll(): Promise<BookEntity[]> {
    return await this.bookRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<BookEntity> {
    const book = await this.bookRepository.findOne({ where: { id }, relations: ['author'] });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<BookEntity> {
    const { authorId, ...bookData } = updateBookDto;

    const author = await this.authorRepository.findOne({ where: { id: authorId } });
    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }

    const bookToUpdate = await this.bookRepository.findOne({ where: { id } });
    if (!bookToUpdate) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    bookToUpdate.title = bookData.title || bookToUpdate.title;
    bookToUpdate.description = bookData.description || bookToUpdate.description;
    bookToUpdate.availability = bookData.availability || bookToUpdate.availability;
    bookToUpdate.date = bookData.date || bookToUpdate.date;
    bookToUpdate.img = bookData.img || bookToUpdate.img;
    bookToUpdate.author = author;

    return await this.bookRepository.save(bookToUpdate);
  }

  async remove(id: number): Promise<void> {
    const bookToRemove = await this.bookRepository.findOne({ where: { id } });

    if (!bookToRemove) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    await this.bookRepository.remove(bookToRemove);
  }
}
