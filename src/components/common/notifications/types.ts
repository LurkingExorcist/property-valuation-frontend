import { AlertColor } from '@mui/material';

export type NotificationItem = {
  uuid: string;
  title: string;
  message?: string;
  color: AlertColor;
};

export type NotificationsController = {
  push: (notification: Omit<NotificationItem, 'uuid'>) => void;
};
