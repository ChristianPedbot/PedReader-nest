import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BookEntity } from '../entities/book.entity';
import { BooksService } from '../services/book.service';
import { CreateBookDto } from '../DTO/create-book.dto';
import { UpdateBookDto } from '../DTO/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): Promise<BookEntity[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BookEntity> {
    console.log(`Controller received ID: ${id}`); 
    return this.booksService.findOne(+id);
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: number): Promise<BookEntity[]> {
    return this.booksService.findByCategory(categoryId);
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<BookEntity> {
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<BookEntity> {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(+id);
  }
}
