import { GridSortModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

import { FindQuery, PaginatedData, Where } from '@/types';

import { useAPI } from './useAPI';

export const usePaginatedAPI = <T>(
  request: (query: FindQuery<T>) => Promise<PaginatedData<T>>,
  initialPageSize: number
) => {
  const [where, setWhere] = useState<Where<T>>({});
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sort, setSort] = useState<GridSortModel>([]);
  const api = useAPI(() =>
    request({
      where,
      sort,
      pageIndex,
      pageSize,
    })
  );

  useEffect(() => {
    api.callAPI();
  }, [pageIndex, pageSize, sort, where]);

  return {
    ...api,
    sort,
    pageIndex,
    pageSize,
    setWhere,
    setSort,
    setPageIndex,
    setPageSize,
  };
};
