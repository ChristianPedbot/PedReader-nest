import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateLocationInput {
  @Field(() => Date, { nullable: true })
  @IsOptional()
  location_date?: Date;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  return_date: Date;

  @Field(() => Int)
  @IsNotEmpty()
  bookId: number;

  @Field(() => Int)
  @IsNotEmpty()
  userId: number;
}
