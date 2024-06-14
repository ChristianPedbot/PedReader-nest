import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { AuthorEntity } from '../../authors/entities/author.entity';
//import { CategoriesEntity } from '../../categories/entities/categorie.entitye';


@Entity({
    name: 'books'
})
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true
    })
    title: string;

    @Column({
        type: 'varchar',
        length: 500
    })
    description: string;

    @Column({
        type: 'int',
        unique: true
    })
    availability: number;

    @Column({
        type: 'date',
        nullable: false 
    })
    date: Date;

    /*@ManyToOne(() => CategoriesEntity)
    @JoinColumn({ name: 'categorie_id' })
    categorie: CategoriesEntity;*/

    @ManyToOne(() => AuthorEntity)
    @JoinColumn({ name: 'author_id' })
    author: AuthorEntity;

    @Column({
        type: 'longtext',
        nullable: true 
    })
    img: string;
}
