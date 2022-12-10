import { Button } from '@mui/material';

import { ModalLayout, ModalProps } from '../modal';

import './confirm-modal.scss';

type Props = ModalProps & {
  message: string;
  onConfirm: () => void;
  onDecline: () => void;
};

export function ConfirmModal({ message, close, onConfirm, onDecline }: Props) {
  return (
    <ModalLayout
      className="confirm-modal"
      title="Подтвердите действие"
      controls={
        <>
          <Button
            variant="contained"
            onClick={() => {
              onConfirm();
              close();
            }}
          >
            Да
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              onDecline();
              close();
            }}
          >
            Нет
          </Button>
        </>
      }
      close={close}
    >
      <div className="confirm-modal__message">{message}</div>
    </ModalLayout>
  );
}
