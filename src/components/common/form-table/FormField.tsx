import clsx from 'clsx';
import { PropsWithChildren, ReactNode } from 'react';

import { PropsWithClassName } from '@/types';

import './form-field.scss';

type Props = PropsWithChildren<
  PropsWithClassName<{
    label: ReactNode;
  }>
>;

export function FormField({ className, label, children }: Props) {
  return (
    <tr className={clsx(className, 'form-field')}>
      <th className="form-field__label">{label}</th>
      <td className="form-field__input">{children}</td>
    </tr>
  );
}
