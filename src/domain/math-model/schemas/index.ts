import * as yup from 'yup';

export const MATH_MODEL_SCHEMA = yup.object({
  name: yup.string().default('').required(),
  modelTypeId: yup.string().default(null).required(),
  formula: yup.string().default('').required(),
});
