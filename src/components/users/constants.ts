import { ACCESS_LEVELS } from '@/domain';

import { DOMAIN_ENTITY_TYPES } from '@/constants';

export const DOMAIN_ENTITY_NAMES = Object.freeze({
  [DOMAIN_ENTITY_TYPES.APARTMENT]: 'Квартиры',
  [DOMAIN_ENTITY_TYPES.CITY]: 'Города',
  [DOMAIN_ENTITY_TYPES.VIEW_IN_WINDOW]: 'Виды из окна',
  [DOMAIN_ENTITY_TYPES.USER]: 'Пользователи',
  [DOMAIN_ENTITY_TYPES.ACCESS_RIGHT]: 'Права доступа',
  [DOMAIN_ENTITY_TYPES.MATH_MODEL]: 'Математические модели',
  [DOMAIN_ENTITY_TYPES.MODEL_TYPE]: 'Виды моделей',
  [DOMAIN_ENTITY_TYPES.DATASET]: 'Датасеты',
});

export const ACCESS_LEVELS_NAMES = Object.freeze({
  [ACCESS_LEVELS.FORBIDDEN]: 'Нет доступа',
  [ACCESS_LEVELS.READ]: 'Чтение',
  [ACCESS_LEVELS.WRITE]: 'Запись',
});
