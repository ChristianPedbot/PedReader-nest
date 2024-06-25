import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { CategoryEntity } from '../entities/category.entity';
import { CreateCategoryDto } from '../DTO/create-category.dto';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto: CreateCategoryDto = { id: 26, name: 'Test Category' };

      jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(categoryRepository, 'create').mockReturnValue(createCategoryDto as any);
      jest.spyOn(categoryRepository, 'save').mockResolvedValue(createCategoryDto as any);

      const result = await service.create(createCategoryDto);
      expect(result).toEqual(createCategoryDto);
    });

    it('should not create a category if it already exists', async () => {
      const existingCategory: CategoryEntity = { id: 26, name: 'Test Category' };

      jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(existingCategory);

      const result = await service.create(existingCategory as any);
      expect(result).toEqual(existingCategory);
    });
  });

  describe('findAll', () => {
    it('should return all categories', async () => {
      const categories: CategoryEntity[] = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        { id: 3, name: 'Category 3' },
      ];

      jest.spyOn(categoryRepository, 'find').mockResolvedValue(categories);

      const result = await service.findAll();
      expect(result).toEqual(categories);
    });
  });
});
