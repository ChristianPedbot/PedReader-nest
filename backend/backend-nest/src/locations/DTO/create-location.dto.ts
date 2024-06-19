import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @IsOptional()
  location_date?: Date;

  @IsNotEmpty()
  @IsDate()
  return_date: Date;

  @IsNotEmpty()
  bookId: number;

  @IsNotEmpty()
  userId: number;
}
