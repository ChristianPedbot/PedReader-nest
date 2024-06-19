import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { LocationsService } from '../services/location.service';
import { LocationEntity } from '../entities/location.entity';
import { CreateLocationDto } from '../DTO/create-location.dto';
import { UpdateLocationDto } from '../DTO/update-location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto): Promise<LocationEntity> {
    return await this.locationsService.create(createLocationDto);
  }

  @Get()
  async findAll(): Promise<LocationEntity[]> {
    return await this.locationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<LocationEntity> {
    return await this.locationsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateLocationDto: UpdateLocationDto): Promise<LocationEntity> {
    return await this.locationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.locationsService.remove(id);
  }
}
