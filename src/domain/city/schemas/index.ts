import * as yup from 'yup';

export const CITY_EDIT_SCHEMA = yup.object({
  name: yup.string().default('').required(),
  region: yup.string().default('').required(),
});
