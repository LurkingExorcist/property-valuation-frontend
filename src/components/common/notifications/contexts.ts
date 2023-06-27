import { createContext } from 'react';

import { NotificationsController } from './types';

export const NotificationsContext =
  createContext<NotificationsController | null>(null);
