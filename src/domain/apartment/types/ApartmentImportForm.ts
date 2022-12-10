import { InferType } from 'yup';

import { APARTMENT_IMPORT_SCHEMA } from '../schemas';

export type ApartmentImportForm = InferType<typeof APARTMENT_IMPORT_SCHEMA>;
