import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryService } from '../services/category.service';
import { CategoryController } from '../controllers/category.controller';
import { CategoryResolver } from '../../graphql/categories/resolvers/category.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryService , CategoryResolver],
  controllers: [CategoryController],
})
export class CategoryModule { }
