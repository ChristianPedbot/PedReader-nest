import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './user.service';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<UserEntity | null> {
    const user = await this.usersService.findByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }

  async login(user: UserEntity): Promise<{ token: string }> {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
