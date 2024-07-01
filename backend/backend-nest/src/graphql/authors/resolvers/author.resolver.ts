import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthorsService } from '../../../authors/services/author.service';
import { Author } from '../types/author.type';
import { CreateAuthorInput } from '../inputs/create-author.input';
import { UpdateAuthorInput } from '../inputs/update-author.input';

@Resolver(() => Author)
export class AuhtorResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query(() => [Author], { name: 'authors' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Query(() => Author, { name: 'author' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOne(id);
  }

  @Mutation(() => Author)
  createAuthor(@Args('createAuthorInput') createAuthorInput: CreateAuthorInput) {
    return this.authorsService.create(createAuthorInput);
  }

  @Mutation(() => Author)
  async updateAuthor(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
  ) {
    return this.authorsService.update(id, updateAuthorInput);
  }

  @Mutation(() => Boolean)
  async removeAuthor(@Args('id', { type: () => Int }) id: number) {
    await this.authorsService.remove(id);
    return true;
  }
}
