import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
    name: 'users'
})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true
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
        length: 255,
        unique: true
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 15,
        unique: false
    })
    telephone: string;

    @Column ({
        type: 'varchar',
        length: 50,
        unique: false
    })
    address: string;

    @Column({
        type: 'varchar',
        length: 25,
        unique: false
    })
    city: string;

    @Column({
        type: 'varchar',
        length: 2,
        unique: false
    })
    state: string;

    @Column({
        type: 'longtext',
        nullable: true 
    })
    img: string;

    @Column({
        type: 'tinyint',
        unique: true,
        default: 0
    })
    isAdmin: number;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
}
