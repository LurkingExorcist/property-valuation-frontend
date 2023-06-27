import { InferType } from 'yup';

import { DATASET_CREATE_SCHEMA } from '../schemas';

export type DatasetCreateForm = InferType<typeof DATASET_CREATE_SCHEMA>;
