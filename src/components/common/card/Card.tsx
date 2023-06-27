import './card.scss';

import clsx from 'clsx';
import * as React from 'react';

import { PropsWithClassName } from '@/types';

export interface ICardProps
  extends React.PropsWithChildren,
    PropsWithClassName {}

export function Card(props: ICardProps) {
  return <div className={clsx(props.className, 'card')}>{props.children}</div>;
}
