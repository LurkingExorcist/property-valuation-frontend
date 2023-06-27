import * as yup from 'yup';

export const APARTMENT_IMPORT_SCHEMA = yup.object({
  source: yup.string().default('').required(),
  file: yup.mixed().default(null).required(),
});
