import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 55,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 15,
        nullable: true
    })
    telephone: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    address: string;

    @Column({
        type: 'varchar',
        length: 25,
        nullable: true
    })
    city: string;

    @Column({
        type: 'varchar',
        length: 2,
        nullable: true
    })
    state: string;

    @Column({
        type: 'longtext',
        nullable: true
    })
    img: string;

    @Column({
        type: 'tinyint',
        default: 0
    })
    isAdmin: number;

    @Column({
        type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
}
