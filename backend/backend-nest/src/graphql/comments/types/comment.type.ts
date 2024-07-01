import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Book } from '../../books/types/book.type';
import { User } from '../../users/types/user.type';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field()
  comment: string;

  @Field(() => Book)
  book: Book;

  @Field(() => User)
  user: User;
}
