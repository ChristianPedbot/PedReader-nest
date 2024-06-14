import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from '../controllers/book.controller';
import { BooksService } from '../services/book.service';
import { BookEntity } from '../entities/book.entity';
import { AuthorEntity } from '../../authors/entities/author.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity])],
    controllers: [BooksController],
    providers: [BooksService],
  })
  export class BooksModule {}


