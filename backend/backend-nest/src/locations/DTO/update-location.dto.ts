import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateLocationDto {
  @IsOptional()
  location_date?: Date;

  @IsOptional()
  @IsDate()
  return_date?: Date;

  @IsOptional()
  bookId?: number;

  @IsOptional()
  userId?: number;
}
