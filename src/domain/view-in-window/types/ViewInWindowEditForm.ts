import { InferType } from 'yup';

import { VIEW_IN_WINDOW_EDIT_SCHEMA } from '../schemas';

export type ViewInWindowEditForm = InferType<typeof VIEW_IN_WINDOW_EDIT_SCHEMA>;
