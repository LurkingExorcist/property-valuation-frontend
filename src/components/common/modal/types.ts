import { FunctionComponent, MemoExoticComponent } from 'react';

export type ModalProps = {
  close: () => void;
};

export type WindowComponentType<P extends Record<string, any>> =
  MemoExoticComponent<FunctionComponent<ModalProps & P>>;

export type ModalOptions<P extends Record<string, any>> = {
  props: P;
};

export type ModalContextProps = {
  push: <P extends Record<string, any>>(
    WindowComponent: WindowComponentType<P>,
    options: ModalOptions<P>
  ) => string;
  remove: (id: string) => void;
};
