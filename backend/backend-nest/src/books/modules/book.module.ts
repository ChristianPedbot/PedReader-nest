import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from '../controllers/book.controller';
import { BooksService } from '../services/book.service';
import { BookEntity } from '../entities/book.entity';
import { AuthorEntity } from '../../authors/entities/author.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';


@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity, CategoryEntity,]), CloudinaryModule],
  controllers: [BooksController],
  providers: [BooksService, CloudinaryService],
})
export class BooksModule { }


