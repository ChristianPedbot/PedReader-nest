import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { AuthorEntity } from '../../authors/entities/author.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';

@Entity({
    name: 'books'
})
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    title: string;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: true
    })
    description: string;

    @Column({
        type: 'int',
        nullable: true
    })
    availability: number;


    @Column({
        type: 'date',
        nullable: true
    })
    date: Date;

    @ManyToOne(() => CategoryEntity)
    @JoinColumn({ name: 'categorie_id' })
    categorie: CategoryEntity;

    @ManyToOne(() => AuthorEntity)
    @JoinColumn({ name: 'author_id' })
    author: AuthorEntity;

    @Column({
        type: 'longtext',
        nullable: true
    })
    img: string;
}
