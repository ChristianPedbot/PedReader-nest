import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/modules/book.module';
import { BookEntity } from './books/entities/book.entity';
import { AuthorEntity } from './authors/entities/author.entity';
import { AuthorsModule } from './authors/modules/author.module';
import { UsersModule } from './users/modules/user.module';
import { UserEntity } from './users/entities/user.entity';
import { CategoryModule } from './categories/modules/category.module';
import { CategoryEntity } from './categories/entities/category.entity';
import { CommentEntity } from './comments/entities/comment.entity';
import { CommentsModule } from './comments/modules/comment.module';
import { LocationEntity } from './locations/entities/location.entity';
import { LocationsModule } from './locations/modules/location.module';
import { AuthModule } from './users/modules/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { join } from 'path';
import { BookResolver } from './graphql/books/resolvers/book.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, 

    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'root123',
      database: 'lib',
      entities: [
        BookEntity,
        AuthorEntity,
        UserEntity,
        CategoryEntity,
        CommentEntity,
        LocationEntity,
      ],
      synchronize: true,
      extra: {
        authPlugin: 'mysql_native_password',
      },
    }),
    UsersModule,
    AuthorsModule,
    CategoryModule,
    BooksModule,
    CommentsModule,
    LocationsModule,
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}