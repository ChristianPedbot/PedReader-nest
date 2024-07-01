import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field()
  name: string;

  @Field()
  biography: string;

  @Field()  
  img: string;
}
