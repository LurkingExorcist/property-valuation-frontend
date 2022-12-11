import buildUrl from 'build-url-ts';

import { URLS } from '@/constants';
import { ApartmentEntity } from '@/domain/apartment';
import { requester } from '@/lib';
import { FindQuery, PaginatedData, Where } from '@/types';

import { DatasetCreateForm, DatasetEditForm, DatasetEntity } from '../types';

export class DatasetService {
  static async loadDatasets(query?: FindQuery<DatasetEntity>) {
    const data = await requester
      .get<PaginatedData<DatasetEntity>>(URLS.DATASETS, {
        params: query,
      })
      .then((res) => res.data);

    return data;
  }

  static async createDataset(options: {
    form: DatasetCreateForm & { datasetQuery: Where<ApartmentEntity> };
  }) {
    const data = await requester
      .post<DatasetEntity>(URLS.DATASETS, options.form)
      .then((res) => res.data);

    return data;
  }

  static async updateDataset(options: { id: string; form: DatasetEditForm }) {
    const data = await requester
      .put<DatasetEntity>(
        buildUrl(URLS.DATASETS, { path: options.id }),
        options.form
      )
      .then((res) => res.data);

    return data;
  }

  static async batchRemove(query: Where<DatasetEntity>) {
    await requester.delete(URLS.DATASETS, {
      params: query,
    });
  }
}
