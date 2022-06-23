import { Alert, Snackbar } from '@mui/material';
import * as React from 'react';

import { NotificationsContext } from '@/contexts';
import { Notification } from '@/types';

export interface INotificationsWrapperProps extends React.PropsWithChildren {}

export function NotificationsWrapper(props: INotificationsWrapperProps) {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  const dropNotification = (index: number) => {
    const newNotifications = [...notifications];
    newNotifications.splice(index, 1);

    setNotifications(newNotifications);
  };

  return (
    <NotificationsContext.Provider
      value={{
        push: (notify) => setNotifications([...notifications, notify]),
      }}
    >
      {notifications.map((notify, idx) => (
        <Snackbar
          autoHideDuration={6000}
          onClose={() => dropNotification(idx)}
          key={idx}
          open
        >
          <Alert
            onClose={() => dropNotification(idx)}
            severity="error"
            sx={{ width: '100%' }}
          >
            {notify.title}
          </Alert>
        </Snackbar>
      ))}
      {props.children}
    </NotificationsContext.Provider>
  );
}
