import { ApartmentEntity } from '@/domain/apartment';
import { Where } from '@/types';

export type Dataset = {
  id: string;
  name: string;
  description: string;
  datasetQuery: Where<ApartmentEntity>;
};
