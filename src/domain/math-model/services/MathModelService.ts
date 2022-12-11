import buildUrl from 'build-url-ts';

import { URLS } from '@/constants';
import { requester } from '@/lib';
import { FindQuery, PaginatedData, Where } from '@/types';

import { MathModelEditForm, MathModelEntity } from '../types';

export class MathModelService {
  static async loadMathModels(query?: FindQuery<MathModelEntity>) {
    const data = await requester
      .get<PaginatedData<MathModelEntity>>(URLS.MATH_MODELS, {
        params: query,
      })
      .then((res) => res.data);

    return data;
  }

  static async createMathModel(options: { form: MathModelEditForm }) {
    const data = await requester
      .post<MathModelEntity>(URLS.MATH_MODELS, options.form)
      .then((res) => res.data);

    return data;
  }

  static async updateMathModel(options: {
    id: string;
    form: MathModelEditForm;
  }) {
    const data = await requester
      .put<MathModelEntity>(
        buildUrl(URLS.MATH_MODELS, { path: options.id }),
        options.form
      )
      .then((res) => res.data);

    return data;
  }

  static async batchRemove(query: Where<MathModelEntity>) {
    await requester.delete(URLS.MATH_MODELS, {
      params: query,
    });
  }
}
