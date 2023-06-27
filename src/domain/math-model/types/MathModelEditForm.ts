import { InferType } from 'yup';

import { MATH_MODEL_SCHEMA } from '../schemas';

export type MathModelEditForm = InferType<typeof MATH_MODEL_SCHEMA>;
