export const ROUTE_NAMES = Object.freeze({
  ACCESS_RIGHTS: '/access-rights' as const,
  APARTMENTS: '/apartments' as const,
  AUTHENTICATION: '/auth' as const,
  CITIES: '/cities' as const,
  USERS: '/users' as const,
  VIEWS_IN_WINDOW: '/views-in-window' as const,
  MATH_MODELS: '/math-models' as const,
});

export const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8080/';

export const TOKEN = 'TOKEN';
