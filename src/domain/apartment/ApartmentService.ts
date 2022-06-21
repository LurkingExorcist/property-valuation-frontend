import buildUrl from 'build-url-ts';
import * as _ from 'lodash';
import * as qs from 'qs';

import { api, URLS } from '@/api';

import { Apartment } from './Apartment';

export class ApartmentService {
  static async loadApartments(query?: Partial<Apartment>) {
    const data = await api
      .get<Apartment[]>(
        buildUrl(URLS.APARTMENTS, {
          queryParams: _.mapValues(query, _.unary(qs.stringify)),
        })
      )
      .then((res) => {
        return res;
      })
      .then((res) => res.data);

    return data;
  }
}
