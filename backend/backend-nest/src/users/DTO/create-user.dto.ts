export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  telephone?: string;
  address?: string;
  city?: string;
  state?: string;
  img?: string;
  isAdmin?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
