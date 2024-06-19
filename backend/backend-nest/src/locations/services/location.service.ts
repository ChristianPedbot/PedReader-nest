import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationEntity } from '../entities/location.entity';
import { CreateLocationDto } from '../DTO/create-location.dto';
import { UpdateLocationDto } from '../DTO/update-location.dto';
import { BookEntity } from '../../books/entities/book.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<LocationEntity> {
    const { bookId, userId, location_date, ...locationData } = createLocationDto;

    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    book.availability = 1;
    await this.bookRepository.save(book);

    const locationDate = location_date ? new Date(location_date) : new Date();
    const returnDate = new Date(locationDate);
    returnDate.setDate(locationDate.getDate() + 7);

    const newLocation = this.locationRepository.create({
      ...locationData,  
      location_date: locationDate,
      return_date: returnDate,
      book,
      user,
    });

    return await this.locationRepository.save(newLocation);
  }

  async findAll(): Promise<LocationEntity[]> {
    return await this.locationRepository.find({ relations: ['book', 'user'] });
  }

  async findOne(id: number): Promise<LocationEntity> {
    const location = await this.locationRepository.findOne({ where: { id }, relations: ['book', 'user'] });

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto): Promise<LocationEntity> {
    const { bookId, userId, location_date, ...locationData } = updateLocationDto;

    const location = await this.locationRepository.findOne({ where: { id } });
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    if (bookId) {
      const book = await this.bookRepository.findOne({ where: { id: bookId } });
      if (!book) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }
      book.availability =   0;
      await this.bookRepository.save(book);
      location.book = book;
    }

    if (userId) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      location.user = user;
    }

    if (location_date) {
      const locationDate = new Date(location_date);
      const returnDate = new Date(locationDate);
      returnDate.setDate(locationDate.getDate() + 7);
      location.location_date = locationDate;
      location.return_date = returnDate;
    }

    Object.assign(location, locationData);

    return await this.locationRepository.save(location);
  }

  async remove(id: number): Promise<void> {
    const location = await this.locationRepository.findOne({ where: { id }, relations: ['book'] });

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    location.book.availability = 1;
    await this.bookRepository.save(location.book);

    await this.locationRepository.remove(location);
  }
}
