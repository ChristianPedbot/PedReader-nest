import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { CreateAuthorDto } from '../DTO/create-author.dto';
import { UpdateAuthorDto } from '../DTO/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) { }

  async findAll(): Promise<AuthorEntity[]> {
    return this.authorRepository.find();
  }

  async onModuleInit() {
    await this.ensureDefaultAuthor();
  }

  async findOne(id: number): Promise<AuthorEntity> {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    return author;
  }

  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorEntity> {
    const author = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(author);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<AuthorEntity> {
    const author = await this.findOne(id);

    if (updateAuthorDto.img === undefined) {
      updateAuthorDto.img = author.img; // Mantém a imagem existente se a nova imagem for undefined
    }

    await this.authorRepository.update(id, updateAuthorDto);
    const updatedAuthor = await this.findOne(id);
    return updatedAuthor;
  }

  async remove(id: number): Promise<void> {
    await this.authorRepository.delete(id);
  }

  public async ensureDefaultAuthor() {
    const count = await this.authorRepository.count();
    if (count === 0) {
      const defaultAuthor: CreateAuthorDto = {
        name: 'Default Author Name',
        biography: 'This is a default author biography.',
        img: 'default-image-url',
      };
      await this.create(defaultAuthor);
    }
  }

}
