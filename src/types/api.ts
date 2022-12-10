import { FILTER_OPERATORS } from '@/constants';

import { Path } from './path';
import { ObjectValueOf, Primitive } from './utility';

export type SortDirection = 'asc' | 'desc' | undefined;
export type SortItem<T extends Record<string, unknown>> = {
  field: Path<T>;
  sort: SortDirection;
};

export type FilterOperator = ObjectValueOf<typeof FILTER_OPERATORS>;

export type FilterOperation = [FilterOperator, Primitive | Primitive[]];

export type Where<T> = {
  [K in keyof T]?: Where<T[K]> | FilterOperation;
};

export type FindQuery<T extends Record<string, unknown>> = {
  where?: Where<T>;
  sort?: SortItem<T>[];
  pageSize?: number;
  pageIndex?: number;
};

export type PaginatedData<T> = {
  content: T[];
  total: number;
};
