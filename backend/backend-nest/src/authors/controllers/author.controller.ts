import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthorsService } from '../services/author.service';
import { AuthorEntity } from '../entities/author.entity';
import { CreateAuthorDto } from '../DTO/create-author.dto';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { UpdateAuthorDto } from '../DTO/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  @Get()
  async findAll(): Promise<AuthorEntity[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AuthorEntity> {
    return this.authorsService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('img'))
  async create(
    @Body() createAuthorDto: CreateAuthorDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<AuthorEntity> {
    let img = null;
    if (file) {
      img = await this.cloudinaryService.uploadImage(file);
    }

    const author = await this.authorsService.create({ ...createAuthorDto, img });
    return author;
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('img'))
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<AuthorEntity> {
    let img = null;
    if (file) {
      img = await this.cloudinaryService.uploadImage(file);
    }

    const author = await this.authorsService.update(+id, { ...updateAuthorDto, img: img ?? undefined });
    return author;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.authorsService.remove(+id);
  }
}
