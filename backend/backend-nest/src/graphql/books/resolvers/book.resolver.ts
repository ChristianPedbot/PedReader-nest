import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from '../../../books/services/book.service';
import { Book } from '../types/book.type';
import { CreateBookInput } from '../inputs/create-book.input';
import { UpdateBookInput } from '../inputs/update-book.input';
import { BookEntity } from '../../../books/entities/book.entity';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.booksService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.findOne(id);
  }

  @Query(() => [Book], { name: 'booksByCategory' })
  findByCategory(@Args('categoryId', { type: () => Int }) categoryId: number) {
    return this.booksService.findByCategory(categoryId);
  }

  @Mutation(() => BookEntity)
  async createBook(
    @Args('createBookInput') createBookInput: CreateBookInput,
  ): Promise<BookEntity> {
    return this.booksService.create(createBookInput);
  }
  @Mutation(() => BookEntity)
  async updateBook(
    @Args('id') id: number,
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
  ): Promise<BookEntity> {
    return this.booksService.update(id, updateBookInput);
  }

  @Mutation(() => Boolean)
  async removeBook(@Args('id', { type: () => Int }) id: number) {
    await this.booksService.remove(id);
    return true;
  }
}
  