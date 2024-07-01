import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql'; // Importe ID para o tipo de campo de ID

@Entity('authors')
@ObjectType() // Decorador para indicar que essa classe representa um tipo GraphQL
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID) // Decorador para expor o campo como um tipo ID no GraphQL
  id: number;

  @Column({
    type: 'varchar',
    length: 255
  })
  @Field() // Decorador para expor o campo como um tipo de campo padrão no GraphQL
  name: string;

  @Column({
    type: 'text'
  })
  @Field() // Decorador para expor o campo como um tipo de campo padrão no GraphQL
  biography: string;

  @Column({
    type: 'longtext',
    nullable: true
  })
  @Field({ nullable: true }) // Decorador para expor o campo como um tipo de campo padrão no GraphQL, com opção de ser nulo
  img: string;
}
