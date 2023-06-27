import * as _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  FilterOperation,
  FindQuery,
  PaginatedData,
  Path,
  SortItem,
  Where,
} from '@/types';

import { useAPI } from './useAPI';

export const usePaginatedAPI = <T extends Record<string, unknown>>(
  request: (query: FindQuery<T>) => Promise<PaginatedData<T>>,
  options: {
    initialPageSize: number;
  }
) => {
  const [where, setWhere] = useState<Where<T>>({});
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(options.initialPageSize);
  const [sort, setSort] = useState<SortItem<T>[]>([]);

  const runRequest = useCallback(
    () =>
      request({
        where,
        sort,
        pageIndex,
        pageSize,
      }),
    [where, sort, pageIndex, pageSize]
  );

  const api = useAPI(runRequest);

  const pagesCount = useMemo(
    () => Math.ceil((api.data?.total || 0) / pageSize),
    [api.data, pageSize]
  );

  useEffect(() => {
    api.callAPI();
  }, [pageIndex, pageSize, sort, where]);

  const onChangeSort = useCallback(
    (sortItem: SortItem<T>) =>
      setSort((sortItems) => {
        const newSortItems = [...sortItems];

        const index = newSortItems.findIndex(
          (si) => si.field === sortItem.field
        );

        if (index === -1) {
          newSortItems.push(sortItem);
          return newSortItems;
        }

        if (_.isUndefined(sortItem.sort)) {
          newSortItems.splice(index, 1);
          return newSortItems;
        }

        newSortItems[index].sort = sortItem.sort;

        return newSortItems;
      }),
    []
  );

  const onChangeFilter = useCallback(
    (prop: Path<T>) => (filter: FilterOperation | undefined) =>
      setWhere((where) =>
        _.set(
          {
            ...where,
          },
          prop,
          filter
        )
      ),
    []
  );

  return {
    ...api,
    where,
    sort,
    pageIndex: pageIndex + 1,
    pageSize,
    pagesCount,
    setWhere,
    setSort,
    setPageIndex: (page: number) => setPageIndex(page - 1),
    setPageSize,
    onChangeSort,
    onChangeFilter,
  };
};
