import { Controller, Get, Query } from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get('nearby')
  async getNearbyPlaces(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('radius') radius: number,
  ) {
    const places = await this.placesService.getPopularPlaces(lat, lon, radius);
    return places;
  }
}
