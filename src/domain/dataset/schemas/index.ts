import * as yup from 'yup';

export const DATASET_CREATE_SCHEMA = yup.object({
  name: yup.string().default('').required(),
  description: yup.string().default('').required(),
  splitRatio: yup.number().default(0.8).required(),
});

export const DATASET_EDIT_SCHEMA = yup.object({
  description: yup.string().default('').required(),
});
