import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsService } from '../services/author.service';
import { AuthorsController } from '../controllers/author.controller';
import { AuthorEntity } from '../entities/author.entity';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { AuhtorResolver } from '../../graphql/authors/resolvers/author.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity]),
    CloudinaryModule,
  ],
  providers: [AuthorsService, CloudinaryService , AuhtorResolver],
  controllers: [AuthorsController],
})
export class AuthorsModule { }
