import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Author } from '../../authors/types/author.type';
import { Category } from '../../categories/types/category.type';
@ObjectType()
export class Book {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  img: string;  

  @Field(() => Int)
  availability: number;

  @Field({nullable: true})
  date: string;

  @Field(() => Author)
  author: Author;

  @Field(() => Category)
  category: Category;
}
