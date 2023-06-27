import { memo, useCallback, useContext, useState } from 'react';

import { ModalProps, ModalsContext } from '@/components';

export const useModal = <P extends Record<string, any> = Record<string, never>>(
  render: (props: ModalProps & P) => JSX.Element
) => {
  const modals = useContext(ModalsContext);
  if (!modals) throw new Error("ModalContext didn't provided");

  const [uuid, setUuid] = useState<string>();

  const WindowComponent = memo(render);

  const hide = useCallback(() => {
    if (!uuid) return;

    modals.remove(uuid);
  }, [modals, uuid]);

  const show = useCallback(
    (props: P = {} as P) => {
      setUuid(modals?.push(WindowComponent, { props }));
    },
    [WindowComponent, modals]
  );

  return {
    hide,
    show,
  };
};
