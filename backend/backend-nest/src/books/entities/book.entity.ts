import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AuthorEntity } from '../../authors/entities/author.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity({
  name: 'books'
})
@ObjectType()
export class BookEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  @Field({ nullable: true })
  title: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true
  })
  @Field({ nullable: true })
  description: string;

  @Column({
    type: 'int',
    nullable: true
  })
  @Field(() => Int, { nullable: true })
  availability: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true
  })
  @Field({ nullable: true })
  date: string;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  @Field(() => CategoryEntity)
  category: CategoryEntity;

  @ManyToOne(() => AuthorEntity)
  @JoinColumn({ name: 'author_id' })
  @Field(() => AuthorEntity)
  author: AuthorEntity;

  @Column({
    type: 'longtext',
    nullable: true
  })
  @Field({ nullable: true })
  img: string;
}
