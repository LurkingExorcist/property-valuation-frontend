import * as _ from 'lodash';
import { ReactNode, useCallback, useState, useMemo } from 'react';
import { v4 } from 'uuid';

import { ModalContainer } from './ModalContainer';
import { ModalsContext } from './context';
import { ModalOptions, WindowComponentType, ModalContextProps } from './types';

type Props = {
  children: ReactNode | ReactNode[];
};

type Modal<P extends Record<string, any>> = {
  WindowComponent: WindowComponentType<P>;
  uuid: string;
  options: ModalOptions<P>;
};

const modalSelector = (uuid: string) => (modal: Modal<any>) =>
  modal.uuid === uuid;

export function ModalProvider(props: Props) {
  const [modals, setModals] = useState<Modal<any>[]>([]);

  const push = useCallback<ModalContextProps['push']>(
    (WindowComponent, options) => {
      const modal = {
        WindowComponent,
        uuid: v4(),
        options,
      };

      setModals([...modals, modal]);

      return modal.uuid;
    },
    []
  );

  const remove = useCallback(
    (uuid: string) => {
      setModals(modals.filter(_.negate(modalSelector(uuid))));
    },
    [modals]
  );

  const modalContextProps = useMemo(
    () => ({
      push,
      remove,
    }),
    [push, remove]
  );

  const closer = useCallback((uuid: string) => () => remove(uuid), []);

  return (
    <ModalsContext.Provider value={modalContextProps}>
      {props.children}
      {modals.map(({ WindowComponent, uuid, options: { props } }) => (
        <ModalContainer key={uuid} close={closer(uuid)}>
          <WindowComponent close={closer(uuid)} {...props} />
        </ModalContainer>
      ))}
    </ModalsContext.Provider>
  );
}
