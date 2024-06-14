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
    private authorRepository: Repository<AuthorEntity>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorEntity> {
    const { name, biography, img } = createAuthorDto;
    const newAuthor = this.authorRepository.create({ name, biography, img });
    return await this.authorRepository.save(newAuthor);
  }

  async findAll(): Promise<AuthorEntity[]> {
    return await this.authorRepository.find();
  }

  async findOne(id: number): Promise<AuthorEntity> {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<AuthorEntity> {
    const { name, biography, img } = updateAuthorDto;

    const authorToUpdate = await this.authorRepository.findOne({ where: { id } });
    if (!authorToUpdate) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    authorToUpdate.name = name || authorToUpdate.name;
    authorToUpdate.biography = biography || authorToUpdate.biography;
    authorToUpdate.img = img || authorToUpdate.img;

    return await this.authorRepository.save(authorToUpdate);
  }

  async remove(id: number): Promise<void> {
    const authorToRemove = await this.authorRepository.findOne({ where: { id } });

    if (!authorToRemove) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    await this.authorRepository.remove(authorToRemove);
  }
}
