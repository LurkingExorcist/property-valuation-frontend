import { InferType } from 'yup';

import { USER_EDIT_SCHEMA } from '../schemas';

export type UserEditForm = InferType<typeof USER_EDIT_SCHEMA>;
