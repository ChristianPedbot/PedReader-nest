import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsService } from './services/author.service';
import { AuthorsController } from './controllers/author.controller';
import { AuthorEntity } from './entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
  providers: [AuthorsService],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
