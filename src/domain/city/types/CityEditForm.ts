import { InferType } from 'yup';

import { CITY_EDIT_SCHEMA } from '../schemas';

export type CityEditForm = InferType<typeof CITY_EDIT_SCHEMA>;
