import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BookEntity } from '../entities/book.entity';
import { BooksService } from '../services/book.service';
import { CreateBookDto } from '../DTO/create-book.dto';
import { UpdateBookDto } from '../DTO/update-book.dto';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  @Get()
  async findAll(): Promise<BookEntity[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BookEntity> {
    return this.booksService.findOne(+id);
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: number): Promise<BookEntity[]> {
    return this.booksService.findByCategory(categoryId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('img'))
  async create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<BookEntity> {
    let img = null;
    if (file) {
      img = await this.cloudinaryService.uploadImage(file);
    }
    const book = await this.booksService.create({ ...createBookDto, img });
    return book;
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('img'))
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<BookEntity> {
    let img = null;
    if (file) {
      img = await this.cloudinaryService.uploadImage(file);
    }
    const book = await this.booksService.update(+id, { ...updateBookDto, img: img ?? undefined });
    return book;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(+id);
  }
}
