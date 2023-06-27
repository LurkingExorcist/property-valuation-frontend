import { InferType } from 'yup';

import { MODEL_TRAIN_SCHEMA } from '../schemas';

export type MathModelTrainForm = InferType<typeof MODEL_TRAIN_SCHEMA>;
