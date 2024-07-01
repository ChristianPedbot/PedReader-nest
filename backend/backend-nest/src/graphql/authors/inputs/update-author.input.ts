import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUrl, Length, IsOptional } from 'class-validator';

@InputType()
export class UpdateAuthorInput {

  @Field({ nullable: true })
  @Length(3)
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  biography?: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  img?: string;
}
