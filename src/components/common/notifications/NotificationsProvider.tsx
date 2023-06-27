import { Alert, Snackbar } from '@mui/material';
import * as React from 'react';
import { v4 } from 'uuid';

import { NotificationsContext } from './contexts';
import { NotificationItem, NotificationsController } from './types';

export interface INotificationsProviderProps extends React.PropsWithChildren {}

export function NotificationsProvider(props: INotificationsProviderProps) {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(
    []
  );

  const dropNotification = React.useCallback(
    (uuid: string) => {
      const index = notifications.findIndex(
        (notification) => notification.uuid === uuid
      );

      const newNotifications = [...notifications];
      newNotifications.splice(index, 1);

      setNotifications(newNotifications);
    },
    [notifications]
  );

  const notificationsProps = React.useMemo<NotificationsController>(
    () => ({
      push: (notify) =>
        setNotifications((notifications) => [
          ...notifications,
          { uuid: v4(), ...notify },
        ]),
    }),
    []
  );

  return (
    <NotificationsContext.Provider value={notificationsProps}>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.uuid}
          autoHideDuration={6000}
          onClose={() => dropNotification(notification.uuid)}
          open
        >
          <Alert
            className="notification-alert"
            severity={notification.color}
            sx={{ width: '100%' }}
            onClose={() => dropNotification(notification.uuid)}
          >
            <div className="notification-alert__title">
              {notification.title}
            </div>
            <div className="notification-alert__message">
              {notification.message}
            </div>
          </Alert>
        </Snackbar>
      ))}
      {props.children}
    </NotificationsContext.Provider>
  );
}
