import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
    @Field()
    comment: string;

    @Field(() => Int)
    bookId: number;

    @Field(() => Int)
    userId: number;
}
