import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BookEntity } from '../../../books/entities/book.entity';
import { UserEntity } from '../../../users/entities/user.entity';

@ObjectType()
export class LocationType {
  @Field(() => Int)
  id: number;

  @Field()
  location_date: Date;

  @Field()
  return_date: Date;

  @Field(() => BookEntity)
  book: BookEntity;

  @Field(() => UserEntity)
  user: UserEntity;
}
