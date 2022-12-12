import * as yup from 'yup';

export const MATH_MODEL_SCHEMA = yup.object({
  name: yup.string().default('').required(),
  modelTypeId: yup.string().default('').required(),
  formula: yup.string().default('').required(),
});

export const MODEL_TRAIN_SCHEMA = yup.object({
  datasetId: yup.string().default('').required(),
});

export const MODEL_PREDICT_SCHEMA = yup.object({
  datasetId: yup.string().default('').required(),
});
