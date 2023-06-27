import buildUrl from 'build-url-ts';

import { URLS } from '@/constants';
import { requester } from '@/lib';
import { FindQuery, PaginatedData, Where } from '@/types';

import { CityEditForm, CityEntity } from '../types';

export class CityService {
  static async loadCities(query?: FindQuery<CityEntity>) {
    const data = await requester
      .get<PaginatedData<CityEntity>>(URLS.CITIES, {
        params: query,
      })
      .then((res) => res.data);

    return data;
  }

  static async createCity(options: { form: CityEditForm }) {
    const data = await requester
      .post<CityEntity>(URLS.CITIES, options.form)
      .then((res) => res.data);

    return data;
  }

  static async updateCity(options: { id: string; form: CityEditForm }) {
    const data = await requester
      .put<CityEntity>(
        buildUrl(URLS.CITIES, { path: options.id }),
        options.form
      )
      .then((res) => res.data);

    return data;
  }

  static async batchRemove(query: Where<CityEntity>) {
    await requester.delete(URLS.CITIES, {
      params: query,
    });
  }
}
