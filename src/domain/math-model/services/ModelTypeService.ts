import { URLS } from '@/constants';
import { requester } from '@/lib';
import { PaginatedData } from '@/types';

import { ModelTypeEntity } from '../types';

export class ModelTypeService {
  static async loadModelTypes() {
    return requester
      .get<PaginatedData<ModelTypeEntity>>(URLS.MODEL_TYPES)
      .then((res) => res.data);
  }
}
