import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from '../../../comments/services/comment.service';
import { CommentEntity } from '../../../comments/entities/comment.entity';
import { CreateCommentInput } from '../inputs/create-comment.input';

@Resolver(() => CommentEntity)
export class CommentResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => CommentEntity)
  async createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput): Promise<CommentEntity> {
    return this.commentsService.create(createCommentInput);
  }

  @Query(() => [CommentEntity])
  async comments(): Promise<CommentEntity[]> {
    return this.commentsService.findAll();
  }

  @Query(() => CommentEntity)
  async comment(@Args('id', { type: () => Int }) id: number): Promise<CommentEntity> {
    return this.commentsService.findOne(id);
  }

  @Mutation(() => CommentEntity)
  async removeComment(@Args('id', { type: () => Int }) id: number): Promise<void> {
    await this.commentsService.remove(id);
  }
}
