import * as qs from 'qs';

import { api, URLS } from '@/api';
import { FindQuery, PaginatedData } from '@/types';

import { City } from './City';

export class CityService {
  static async loadCities(query?: FindQuery<City>) {
    const data = await api
      .get<PaginatedData<City>>(URLS.CITIES + '?' + qs.stringify(query))
      .then((res) => res.data);

    return data;
  }
}
