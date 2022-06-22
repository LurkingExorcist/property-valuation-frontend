import * as qs from 'qs';

import { api, URLS } from '@/api';
import { FindQuery, PaginatedData } from '@/types';

import { Apartment } from './Apartment';

export class ApartmentService {
  static async loadApartments(query?: FindQuery<Apartment>) {
    const data = await api
      .get<PaginatedData<Apartment>>(
        URLS.APARTMENTS + '?' + qs.stringify(query)
      )
      .then((res) => res.data);

    return data;
  }
}
