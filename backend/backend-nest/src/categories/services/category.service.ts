import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { CreateCategoryDto } from '../DTO/create-category.dto';
import { CreateCategoryInput } from '../../graphql/categories/inputs/create-category.input';

@Injectable()
export class CategoryService implements OnModuleInit {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) { }

  async onModuleInit() {
    const categories = [
      { id: 14, name: 'Fiction' },
      { id: 15, name: 'Romance' },
      { id: 16, name: 'Horror' },
      { id: 17, name: 'Mystery' },
      { id: 18, name: 'Suspense' },
      { id: 19, name: 'Adventure' },
      { id: 20, name: 'Drama' },
      { id: 21, name: 'Comedy' },
      { id: 22, name: 'Poetry' },
      { id: 23, name: 'Educational' },
      { id: 24, name: 'Fantasy' },
      { id: 25, name: 'Children' },
    ];

    for (const category of categories) {
      await this.createWithId(category);
    }
  }

  async create(createCategoryInput: CreateCategoryInput): Promise<CategoryEntity> {
    const category = this.categoryRepository.create(createCategoryInput);
    return this.categoryRepository.save(category);
  }

  async createWithId(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const { id, name } = createCategoryDto;
    let category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      category = this.categoryRepository.create({ id, name });
      await this.categoryRepository.save(category);
    }

    return category;
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }
}
