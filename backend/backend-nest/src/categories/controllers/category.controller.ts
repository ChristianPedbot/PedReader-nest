import { Controller, Post, Get, Body } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../DTO/create-category.dto';
import { CategoryEntity } from '../entities/category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryService.findAll();
  }

  
}
