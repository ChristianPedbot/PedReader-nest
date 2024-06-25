import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { UsersController } from '../controllers/user.controller';
import { AuthModule } from './auth.module';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
    CloudinaryModule,
  ],
  providers: [UsersService, CloudinaryService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule { }
