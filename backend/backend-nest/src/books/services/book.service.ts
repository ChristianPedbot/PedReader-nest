import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from '../entities/book.entity';
import { CreateBookDto } from '../DTO/create-book.dto';
import { UpdateBookDto } from '../DTO/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async onModuleInit() {
    await this.ensureDefaultBook();
  }


  async findAll(): Promise<BookEntity[]> {
    return this.bookRepository.find();
  }

  async findOne(id: number): Promise<BookEntity> {
    return this.bookRepository.findOne({
      where: { id },
      relations: ['author', 'categorie'],
    });
  }

  async findByCategory(categoryId: number): Promise<BookEntity[]> {
    return this.bookRepository.find({ where: { categorie: { id: categoryId } }, relations: ['categorie'] });
  }

  async create(createBookDto: CreateBookDto): Promise<BookEntity> {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<BookEntity> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['categorie', 'author'],
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found.`);
    }

    this.bookRepository.merge(book, updateBookDto);

    await this.bookRepository.save(book);

    return this.findOne(id);
  }


  public async ensureDefaultBook() {
    const count = await this.bookRepository.count();
    if (count === 0) {
      const defaultBook: CreateBookDto = {
        title: 'First Book',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula nunc sed lectus malesuada, vitae placerat enim faucibus. Duis fermentum turpis id orci luctus, vel dapibus arcu ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed in libero vel nisi laoreet consectetur.',
        availability: 1,
        date: new Date(),
        categorie_id: 14,  
        author_id: 1,    
        img: 'https://res.cloudinary.com/dechfylvy/image/upload/v1719245763/colfx7jlix6hsmzxkdtk.jpg',
      };
      await this.create(defaultBook);
    }
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
