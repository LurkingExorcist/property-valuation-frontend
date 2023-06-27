import './auth-layout.scss';

import { Paper } from '@mui/material';
import clsx from 'clsx';
import * as React from 'react';

import { StarsBackground } from '@/components';
import { PropsWithClassName } from '@/types';

export interface IAuthLayoutProps
  extends React.PropsWithChildren,
    PropsWithClassName {}

export function AuthLayout(props: IAuthLayoutProps) {
  return (
    <div className={clsx(props.className, 'auth-layout')}>
      <div className="auth-layout__background">
        <StarsBackground />
      </div>
      <div className="auth-layout__main">
        <Paper className="auth-layout__card">{props.children}</Paper>
      </div>
    </div>
  );
}
