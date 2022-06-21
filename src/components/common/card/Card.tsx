import './card.scss';

import clsx from 'clsx';
import * as React from 'react';

import { CNProps } from '@/types';

export interface ICardProps extends React.PropsWithChildren, CNProps {}

export function Card(props: ICardProps) {
  return <div className={clsx(props.className, 'card')}>{props.children}</div>;
}
