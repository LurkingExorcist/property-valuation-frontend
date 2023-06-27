import { ConfirmModal } from '@/components';

import { useModal } from './useModal';

export const useConfirm = () => {
  const confirmModal = useModal(ConfirmModal);

  return (message: string) =>
    new Promise<void>((onConfirm, onDecline) =>
      confirmModal.show({
        message,
        onConfirm,
        onDecline,
      })
    );
};
