import { api, URLS } from '@/api';
import { PaginatedData } from '@/types';

import { ViewInWindow } from './ViewInWindow';

export class ViewInWindowService {
  static async loadViewsInWindow() {
    const data = await api
      .get<PaginatedData<ViewInWindow>>(URLS.VIEWS_IN_WINDOW)
      .then((res) => res.data);

    return data;
  }
}
