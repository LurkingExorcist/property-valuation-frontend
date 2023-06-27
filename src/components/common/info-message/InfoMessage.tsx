import { Paper } from '@mui/material';
import clsx from 'clsx';
import { ReactNode } from 'react';

import { PropsWithClassName } from '@/types';

import './info-message.scss';

type Props = PropsWithClassName<{
  title: ReactNode;
  text: ReactNode;
}>;

export function InfoMessage({ className, title, text }: Props) {
  return (
    <Paper className={clsx(className, 'info-message')}>
      <div className="info-message__title">{title}</div>
      <div className="info-message__text">{text}</div>
    </Paper>
  );
}
