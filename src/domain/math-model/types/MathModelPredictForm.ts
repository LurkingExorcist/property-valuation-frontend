import { InferType } from 'yup';

import { MODEL_PREDICT_SCHEMA } from '../schemas';

export type MathModelPredictForm = InferType<typeof MODEL_PREDICT_SCHEMA>;
