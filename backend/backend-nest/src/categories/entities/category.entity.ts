import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
    name: 'categories'
})
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true
    })
    name: string;

}
