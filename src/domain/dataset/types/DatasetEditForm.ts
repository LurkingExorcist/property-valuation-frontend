import { InferType } from 'yup';

import { DATASET_EDIT_SCHEMA } from '../schemas';

export type DatasetEditForm = InferType<typeof DATASET_EDIT_SCHEMA>;
