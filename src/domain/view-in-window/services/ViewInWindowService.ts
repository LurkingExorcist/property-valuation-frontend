import { URLS } from '@/constants';
import { requester } from '@/lib';
import { PaginatedData } from '@/types';

import { ViewInWindowEntity } from '../types';

export class ViewInWindowService {
  static async loadViewsInWindow() {
    const data = await requester
      .get<PaginatedData<ViewInWindowEntity>>(URLS.VIEWS_IN_WINDOW)
      .then((res) => res.data);

    return data;
  }
}
