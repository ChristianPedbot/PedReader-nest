import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LocationsService } from '../../../locations/services/location.service';
import { LocationType } from '../types/location.type';
import { CreateLocationInput } from '../inputs/create-location.input';
import { UpdateLocationInput } from '../inputs/update-location.input';
@Resolver(() => LocationType)
export class LocationResolver {
  constructor(private readonly locationsService: LocationsService) {}

  @Mutation(() => LocationType)
  createLocation(@Args('createLocationInput') createLocationInput: CreateLocationInput) {
    return this.locationsService.create(createLocationInput);
  }

  @Query(() => [LocationType])
  findAllLocations() {
    return this.locationsService.findAll();
  }

  @Query(() => LocationType)
  findLocation(@Args('id', { type: () => Int }) id: number) {
    return this.locationsService.findOne(id);
  }

  @Mutation(() => LocationType)
  updateLocation(@Args('updateLocationInput') updateLocationInput: UpdateLocationInput) {
    return this.locationsService.update(updateLocationInput.id, updateLocationInput);
  }

  @Mutation(() => LocationType)
  removeLocation(@Args('id', { type: () => Int }) id: number) {
    return this.locationsService.remove(id);
  }

  @Query(() => [LocationType])
  findLocationsByUser(@Args('userId', { type: () => Int }) userId: number) {
    return this.locationsService.findByUser(userId);
  }

  @Query(() => [LocationType])
  findLocationsByBook(@Args('bookId', { type: () => Int }) bookId: number) {
    return this.locationsService.findByBookId(bookId);
  }
}