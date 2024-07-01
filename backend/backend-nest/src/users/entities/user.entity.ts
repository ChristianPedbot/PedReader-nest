import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class UserEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    @Field()
    name: string;

    @Column({
        type: 'varchar',
        length: 55,
        unique: true
    })
    @Field()
    email: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    @Field()
    password: string;

    @Column({
        type: 'varchar',
        length: 15,
        nullable: true
    })
    @Field({ nullable: true })
    telephone: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    @Field({ nullable: true })
    address: string;

    @Column({
        type: 'varchar',
        length: 25,
        nullable: true
    })
    @Field({ nullable: true })
    city: string;

    @Column({
        type: 'varchar',
        length: 2,
        nullable: true
    })
    @Field({ nullable: true })
    state: string;

    @Column({
        type: 'longtext',
        nullable: true
    })
    @Field({ nullable: true })
    img: string;

    @Column({
        type: 'tinyint',
        default: 0
    })
    @Field(() => Int)
    isAdmin: number;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    @Field()
    createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    @Field()
    updatedAt: Date;
}
