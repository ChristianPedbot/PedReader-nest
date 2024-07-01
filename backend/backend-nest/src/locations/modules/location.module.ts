import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsService } from '../services/location.service';
import { LocationsController } from '../controllers/location.controller';
import { LocationEntity } from '../entities/location.entity';
import { BookEntity } from '../../books/entities/book.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { LocationResolver } from '../../graphql/locations/resolvers/location.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity, BookEntity, UserEntity])],
  providers: [LocationsService , LocationResolver],
  controllers: [LocationsController],
})
export class LocationsModule { }
