import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Int)
  availability: number;

  @Field({ nullable: true })
  date: string;

  @Field(() => Int, { nullable: true })
  author_id: number;

  @Field(() => Int, { nullable: true })
  category_id: number;

  @Field()  
  img: string;
}
