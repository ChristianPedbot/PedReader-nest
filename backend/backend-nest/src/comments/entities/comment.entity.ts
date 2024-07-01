import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BookEntity } from '../../books/entities/book.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'comments' })
@ObjectType()
export class CommentEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    @Field()
    comment: string;

    @ManyToOne(() => BookEntity)
    @JoinColumn({ name: 'book_id' })
    @Field(() => BookEntity)
    book: BookEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    @Field(() => UserEntity)
    user: UserEntity;
}
