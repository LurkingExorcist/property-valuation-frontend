import * as React from 'react';

import { NotificationsController, ModalsController } from '@/types';

export const NotificationsContext =
  React.createContext<NotificationsController | null>(null);

export const ModalsContext = React.createContext<ModalsController | null>(null);
