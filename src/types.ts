import { GridSortModel } from '@mui/x-data-grid';
import { ClassValue } from 'clsx';

export interface CNProps {
  className?: ClassValue;
}

export type FindQuery<T> = {
  where?: Record<keyof T, any> | Record<keyof T, any>[];
  sort?: GridSortModel;
  pageSize?: number;
  pageIndex?: number;
};

export type PaginatedData<T> = {
  content: T[];
  total: number;
};
