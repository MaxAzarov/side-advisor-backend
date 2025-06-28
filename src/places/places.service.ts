import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PlacesService {
  async getPopularPlaces(
    lat: number,
    lon: number,
    radius: number,
    categories?: string,
  ): Promise<any[]> {
    const url = 'https://api.foursquare.com/v3/places/search';

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: 'fsq3cYzqklpbGeSD1/qDHm2J7D/P7miclm/1E0l+lVHvxHI=',
        },
        params: {
          client_id: 'GIT21IPFZYRBR1XS3PDQHSIAZLCKGWHUBM5YAZD3WOBTADWP',
          client_secret: '50XTJ2XCLWXLZTC5NQ1IUJ4NWAU4IYQXPW4LVQ4WMF4VQGZ2',
          ll: `${lat},${lon}`,
          radius,
          limit: 10,
          v: '20231010',
          categories,
        },
      });

      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular places:', error.message);
      return [];
    }
  }
}
