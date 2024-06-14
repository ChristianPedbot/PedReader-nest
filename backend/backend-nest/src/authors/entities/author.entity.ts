import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('authors') // nome da tabela no banco de dados
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  biography: string;

  @Column({ type: 'text', nullable: true })
  img: string; // url da imagem do autor, pode ser nulo

  // outras colunas podem ser adicionadas conforme necessário
}
