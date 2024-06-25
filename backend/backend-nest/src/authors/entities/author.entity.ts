import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('authors')
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255
  })
  name: string;

  @Column({
    type: 'text'
  })
  biography: string;

  @Column({
    type: 'longtext',
    nullable: true
  })
  img: string;


}
