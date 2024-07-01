import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from '../../../categories/services/category.service';
import { Category } from '../types/category.type';
import { CreateCategoryInput } from '../inputs/create-category.input';
import { CategoryEntity } from '../../../categories/entities/category.entity';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category], { name: 'categories' })
  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryService.findAll();
  }

  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput
  ): Promise<CategoryEntity> {
    return this.categoryService.create(createCategoryInput);
  }
}
