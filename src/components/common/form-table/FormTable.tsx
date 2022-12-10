import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { PropsWithClassName } from '@/types';

import './form-table.scss';

type Props = PropsWithChildren<PropsWithClassName>;

export function FormTable({ className, children }: Props) {
  return (
    <table className={clsx(className, 'form-table')}>
      <tbody className="form-table__body">{children}</tbody>
    </table>
  );
}
