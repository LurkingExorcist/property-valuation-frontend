import { SxProps } from '@mui/material';
import { GridSortModel } from '@mui/x-data-grid';
import { ClassValue } from 'clsx';
import * as React from 'react';

export interface CNProps {
  className?: ClassValue;
}

export enum FilterOperation {
  CONTAINS = 'contains',
  EQUALS = 'equals',
  STARTS_WITH = 'startsWith',
  ENDS_WITH = 'endsWith',
  IS_EMPTY = 'isEmpty',
  IS_NOT_EMPTY = 'isNotEmpty',
  IS_ANY_OF = 'isAnyOf',
}

export type Where<T> = Partial<
  Record<keyof T, [FilterOperation, string | string[]]>
>;

export type FindQuery<T> = {
  where?: Where<T>;
  sort?: GridSortModel;
  pageSize?: number;
  pageIndex?: number;
};

export type PaginatedData<T> = {
  content: T[];
  total: number;
};

export type Notification = {
  title: string;
};

export type NotificationsController = {
  push: (notification: Notification) => void;
};

export type ModalOptions = {
  style?: SxProps;
};

export type ModalsController = {
  show: (component: React.ReactNode, options: ModalOptions) => void;
};
