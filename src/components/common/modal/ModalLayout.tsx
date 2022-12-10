import { Close } from '@mui/icons-material';
import { Divider, IconButton, Paper } from '@mui/material';
import clsx from 'clsx';
import { PropsWithChildren, ReactNode } from 'react';

import { PropsWithClassName } from '@/types';

import { ModalProps } from './types';

import './modal-layout.scss';

type Props = PropsWithChildren<
  PropsWithClassName<
    ModalProps & {
      title: ReactNode;
      controls?: ReactNode;
    }
  >
>;

export const ModalLayout = ({
  className,
  title,
  controls,
  children,
  close,
}: Props) => {
  return (
    <Paper className={clsx(className, 'modal-layout')}>
      <div className="modal-layout__header">
        <div className="modal-layout__header-title">{title}</div>
        <IconButton className="modal-layout__close-btn" onClick={close}>
          <Close fontSize="small" />
        </IconButton>
      </div>
      <Divider className="modal-layout__divider" sx={{ marginBottom: 2 }} />
      <div className="modal-layout__content">{children}</div>
      {controls && (
        <>
          <Divider className="modal-layout__divider" sx={{ marginTop: 2 }} />
          <div className="modal-layout__controls">{controls}</div>
        </>
      )}
    </Paper>
  );
};
