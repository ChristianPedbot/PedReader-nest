import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUrl, Length, IsOptional } from 'class-validator';

@InputType()
export class UpdateBookInput {
  @Field({ nullable: true })
  @Length(3)
  @IsString()
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  img?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  availability?: number;

  @Field({ nullable: true })
  @IsOptional()
  date?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  category_id?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  author_id?: number;
}
