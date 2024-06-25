import { Controller, Get, Post, Body, Param, Put, Delete, UnauthorizedException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../DTO/create-user.dto';
import { UpdateUserDto } from '../DTO/update-user.dto';
import { AuthService } from '../services/auth.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOne(+id);
  }


  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }


  @Put(':id')
  @UseInterceptors(FileInterceptor('img'))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() file: Express.Multer.File): Promise<UserEntity> {
    let img = null;
    if (file) {
      img = await this.cloudinaryService.uploadImage(file);
    }
    const user = await this.usersService.update(+id, { ...updateUserDto, img });
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }

  @Post('login')
  async login(@Body() loginUserDto: { email: string; password: string }): Promise<{ token: string }> {
    const { email, password } = loginUserDto;

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }
}
