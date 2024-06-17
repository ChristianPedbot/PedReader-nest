import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/modules/book.module';
import { BookEntity } from './books/entities/book.entity';
import { AuthorEntity } from './authors/entities/author.entity';
import { AuthorsModule } from './authors/modules/author.module';
import { UsersModule } from './users/modules/user.module';
import { UserEntity } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql', 
      port: 3306,
      username: 'root',
      password: 'root123',
      database: 'lib',
      entities: [BookEntity, AuthorEntity, UserEntity],
      synchronize: true, 
      extra: {
        authPlugin: 'mysql_native_password',
      },
    }),
    BooksModule,
    AuthorsModule,
    UsersModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}