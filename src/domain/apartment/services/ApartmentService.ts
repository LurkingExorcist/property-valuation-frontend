import buildUrl from 'build-url-ts';

import { URLS } from '@/constants';
import { requester } from '@/lib';
import { FindQuery, PaginatedData, Where } from '@/types';

import { ApartmentEntity } from '../types';

export class ApartmentService {
  static async loadApartments(query?: FindQuery<ApartmentEntity>) {
    const data = await requester
      .get<PaginatedData<ApartmentEntity>>(URLS.APARTMENTS, {
        params: query,
      })
      .then((res) => res.data);

    return data;
  }

  static async importApartments(data: FormData) {
    await requester.post(buildUrl(URLS.APARTMENTS, { path: '/import' }), data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async batchRemove(query: Where<ApartmentEntity>) {
    await requester.delete(URLS.APARTMENTS, {
      params: query,
    });
  }
}
