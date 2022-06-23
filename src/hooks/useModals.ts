import { useContext } from 'react';

import { ModalsContext } from '@/contexts';

export const useModals = () => {
  const modals = useContext(ModalsContext);

  if (!modals) throw new Error("ModalsContext didn't provided");

  return modals;
};
