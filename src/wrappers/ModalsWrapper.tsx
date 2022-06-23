import { Dialog } from '@mui/material';
import * as React from 'react';

import { ModalsContext } from '@/contexts';
import { ModalOptions } from '@/types';

export interface IModalsWrapperProps extends React.PropsWithChildren {}

type Modal = {
  component: React.ReactNode;
  options: ModalOptions;
};

export function ModalsWrapper(props: IModalsWrapperProps) {
  const [modals, setModals] = React.useState<Modal[]>([]);

  const closeModal = (index: number) => {
    const newModals = [...modals];
    newModals.splice(index, 1);

    setModals(newModals);
  };

  return (
    <ModalsContext.Provider
      value={{
        show: (component: React.ReactNode, options: ModalOptions) =>
          setModals([...modals, { component, options }]),
      }}
    >
      {modals.map((modal, idx) => (
        <Dialog key={idx} onClose={() => closeModal(idx)} open>
          {modal.component}
        </Dialog>
      ))}
      {props.children}
    </ModalsContext.Provider>
  );
}
