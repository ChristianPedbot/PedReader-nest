import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BooksService } from '../services/book.service';
import { CreateBookInput } from '../../graphql/books/inputs/create-book.input';
import { UpdateBookInput } from '../../graphql/books/inputs/update-book.input';
import { BookEntity } from '../entities/book.entity';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { Express } from 'express';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly cloudinaryService: CloudinaryService 
  ) {}
  
  @Post()
  @UseInterceptors(FileInterceptor('img'))
  async create(
    @Body() createBookDto: CreateBookInput,
    @UploadedFile() file: Express.Multer.File
  ): Promise<BookEntity> {
    let img = null;
    if (file) {
      img = await this.cloudinaryService.uploadImage(file);
    }
    const book = await this.booksService.create({ ...createBookDto, img });
    return book;
  }
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookInput) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
