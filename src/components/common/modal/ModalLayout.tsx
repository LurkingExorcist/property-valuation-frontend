import { Close } from '@mui/icons-material';
import { Divider, IconButton, Paper } from '@mui/material';
import clsx from 'clsx';
import { PropsWithChildren, ReactNode } from 'react';

import { PropsWithClassName } from '@/types';

import { ModalProps } from './types';

import './modal-layout.scss';

type ModalLayoutClassNames = Partial<{
  header: string;
  content: string;
  controls: string;
}>;

type Props = PropsWithChildren<
  PropsWithClassName<
    ModalProps & {
      title: ReactNode;
      classNames?: ModalLayoutClassNames;
      controls?: ReactNode;
    }
  >
>;

export const ModalLayout = ({
  className,
  title,
  classNames,
  controls,
  children,
  close,
}: Props) => {
  return (
    <Paper className={clsx(className, 'modal-layout')}>
      <div className={clsx(classNames?.header, 'modal-layout__header')}>
        <div className="modal-layout__header-title">{title}</div>
        <IconButton className="modal-layout__close-btn" onClick={close}>
          <Close fontSize="small" />
        </IconButton>
      </div>
      <Divider className="modal-layout__divider" sx={{ marginBottom: 2 }} />
      <div className={clsx(classNames?.content, 'modal-layout__content')}>
        {children}
      </div>
      {controls && (
        <>
          <Divider className="modal-layout__divider" sx={{ marginTop: 2 }} />
          <div className={clsx(classNames?.controls, 'modal-layout__controls')}>
            {controls}
          </div>
        </>
      )}
    </Paper>
  );
};
