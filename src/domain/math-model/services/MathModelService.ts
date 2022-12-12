import buildUrl from 'build-url-ts';

import { URLS } from '@/constants';
import { requester } from '@/lib';
import { FindQuery, PaginatedData, Where } from '@/types';

import {
  MathModelEditForm,
  MathModelEntity,
  MathModelPredictForm,
  MathModelTrainForm,
} from '../types';
import { PredictedApartment } from '../types/PredictedApartment';

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

  static async trainMathModel(options: {
    id: string;
    form: MathModelTrainForm;
  }) {
    const data = await requester
      .post<{ mathModel: MathModelEntity; output: string }>(
        buildUrl(URLS.MATH_MODELS, { path: `/train/${options.id}` }),
        options.form
      )
      .then((res) => res.data);

    return data;
  }

  static async predictMathModel(options: {
    id: string;
    form: MathModelPredictForm;
  }) {
    const data = await requester
      .post<PredictedApartment[]>(
        buildUrl(URLS.MATH_MODELS, { path: `/predict/${options.id}` }),
        options.form
      )
      .then((res) => res.data);

    return data;
  }
}
