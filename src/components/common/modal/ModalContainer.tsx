import { forwardRef, PropsWithChildren } from 'react';

import './modal-container.scss';

type ModalContainerProps = PropsWithChildren<{
  close: () => void;
}>;

export const ModalContainer = forwardRef<HTMLDivElement, ModalContainerProps>(
  function ModalContainer({ close, children }, ref) {
    return (
      <div className="modal-container" ref={ref}>
        <div className="modal-container__overlay" onClick={close} />
        <div className="modal-container__content">{children}</div>
      </div>
    );
  }
);
