import { ClassValue } from 'clsx';

export type PropsWithClassName<T = unknown> = T & {
  className?: ClassValue;
};
