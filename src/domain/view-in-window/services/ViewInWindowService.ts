import buildUrl from 'build-url-ts';

import { URLS } from '@/constants';
import { requester } from '@/lib';
import { PaginatedData, Where } from '@/types';

import { ViewInWindowEntity } from '../types';
import { ViewInWindowEditForm } from '../types/ViewInWindowEditForm';

export class ViewInWindowService {
  static async loadViewsInWindow() {
    const data = await requester
      .get<PaginatedData<ViewInWindowEntity>>(URLS.VIEWS_IN_WINDOW)
      .then((res) => res.data);

    return data;
  }

  static async createViewInWindow(options: { form: ViewInWindowEditForm }) {
    const data = await requester
      .post<ViewInWindowEntity>(URLS.VIEWS_IN_WINDOW, options.form)
      .then((res) => res.data);

    return data;
  }

  static async updateViewInWindow(options: {
    id: string;
    form: ViewInWindowEditForm;
  }) {
    const data = await requester
      .put<ViewInWindowEntity>(
        buildUrl(URLS.VIEWS_IN_WINDOW, { path: options.id }),
        options.form
      )
      .then((res) => res.data);

    return data;
  }

  static async batchRemove(query: Where<ViewInWindowEntity>) {
    await requester.delete(URLS.VIEWS_IN_WINDOW, {
      params: query,
    });
  }
}
