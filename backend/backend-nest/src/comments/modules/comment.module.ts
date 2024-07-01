
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { CommentsService } from '../services/comment.service';
import { CommentsController } from '../controllers/comment.controller';
import { BookEntity } from '../../books/entities/book.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { CommentResolver } from '../../graphql/comments/resolvers/comment.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, BookEntity, UserEntity]),
  ],
  providers: [CommentsService, CommentResolver],
  controllers: [CommentsController],
})
export class CommentsModule { }
