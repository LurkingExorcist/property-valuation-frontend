import * as yup from 'yup';

import { ACCESS_RIGHT_SCHEMA } from '@/domain/access-right/schemas';

export const USER_EDIT_SCHEMA = yup.object({
  username: yup.string().default('').required(),
  email: yup
    .string()
    .email('Неверный формат email-адреса')
    .default('')
    .required(),
  phoneNumber: yup
    .string()
    .matches(
      /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/,
      'Неверный формат номера телефона'
    )
    .default('')
    .required(),
  password: yup.string().default(''),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
  accessRights: yup.array(ACCESS_RIGHT_SCHEMA).default([]),
});
