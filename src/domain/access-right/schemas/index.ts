import * as yup from 'yup';

import { DOMAIN_ENTITY_TYPES } from '@/constants';

import { ACCESS_LEVELS } from '../constants';
import { AccessLevel, DomainEntityType } from '../types';

export const ACCESS_RIGHT_SCHEMA = yup.object({
  id: yup.string().required(),
  domainEntity: yup
    .mixed<DomainEntityType>()
    .required()
    .oneOf(Object.values(DOMAIN_ENTITY_TYPES)),
  accessLevel: yup
    .mixed<AccessLevel>()
    .required()
    .oneOf(Object.values(ACCESS_LEVELS)),
});
