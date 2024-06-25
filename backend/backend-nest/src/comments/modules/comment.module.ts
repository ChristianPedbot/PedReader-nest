
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { CommentsService } from '../services/comment.service';
import { CommentsController } from '../controllers/comment.controller';
import { BookEntity } from '../../books/entities/book.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, BookEntity, UserEntity]),
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule { }
