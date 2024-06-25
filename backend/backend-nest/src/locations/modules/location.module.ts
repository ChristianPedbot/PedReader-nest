import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsService } from '../services/location.service';
import { LocationsController } from '../controllers/location.controller';
import { LocationEntity } from '../entities/location.entity';
import { BookEntity } from '../../books/entities/book.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity, BookEntity, UserEntity])],
  providers: [LocationsService],
  controllers: [LocationsController],
})
export class LocationsModule { }
