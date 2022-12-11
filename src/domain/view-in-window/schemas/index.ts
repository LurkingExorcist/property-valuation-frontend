import * as yup from 'yup';

export const VIEW_IN_WINDOW_EDIT_SCHEMA = yup.object({
  name: yup.string().default('').required(),
  description: yup.string().default('').required(),
});
