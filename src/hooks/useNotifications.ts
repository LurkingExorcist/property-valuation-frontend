import { useContext } from 'react';

import { NotificationsContext } from '@/components';

export const useNotifications = () => {
  const notify = useContext(NotificationsContext);

  if (!notify) throw new Error("NotificationsContext didn't provided");

  return notify;
};
