export const URLS = Object.freeze({
  ACCESS_RIGHTS: '/access-rights',
  APARTMENTS: '/apartments',
  AUTHENTICATION: '/auth',
  CITIES: '/cities',
  USERS: '/users',
  VIEWS_IN_WINDOW: '/views-in-window',
  MATH_MODELS: '/math-models',
  MODEL_TYPES: '/model-types',
  DATASETS: '/datasets',
});

export const DOMAIN_ENTITY_TYPES = Object.freeze({
  ACCESS_RIGHT: 'access-right',
  APARTMENT: 'apartment',
  CITY: 'city',
  USER: 'user',
  VIEW_IN_WINDOW: 'view-in-window',
  MATH_MODEL: 'math-model',
  MODEL_TYPE: 'model-type',
  DATASET: 'dataset',
});

export const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.HOST
    : 'http://localhost:8080/';

export const FILTER_OPERATORS = Object.freeze({
  EQUALS: 'equals',
  LIKE: 'like',
  LESS_THAN: 'lessThan',
  LESS_THAN_EQUAL: 'lessThanEqual',
  MORE_THEN: 'moreThan',
  MORE_THEN_EQUAL: 'moreThanEqual',
  IS_EMPTY: 'isEmpty',
  IS_NOT_EMPTY: 'isNotEmpty',
  IS_ANY_OF: 'isAnyOf',
  BETWEEN: 'between',
});
