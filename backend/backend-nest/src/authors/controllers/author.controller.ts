import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AuthorsService } from '../services/author.service';
import { AuthorEntity } from '../entities/author.entity';
import { CreateAuthorDto } from '../DTO/create-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async findAll(): Promise<AuthorEntity[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AuthorEntity> {
    return this.authorsService.findOne(+id);
  }

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<AuthorEntity> {
    return this.authorsService.create(createAuthorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.authorsService.remove(+id);
  }
}
