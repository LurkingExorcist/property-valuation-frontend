import { URLS } from '@/constants';
import { requester } from '@/lib';
import { FindQuery, PaginatedData } from '@/types';

import { AccessRight } from '../types';

export class AccessRightService {
  static async loadAccessRights(query?: FindQuery<AccessRight>) {
    const data = await requester
      .get<PaginatedData<AccessRight>>(URLS.ACCESS_RIGHTS, {
        params: query,
      })
      .then((res) => res.data);

    return data;
  }
}
