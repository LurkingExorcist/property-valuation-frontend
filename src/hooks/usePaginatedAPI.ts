import { GridSortModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

import { FindQuery, PaginatedData } from '@/types';

import { useAPI } from './useAPI';

export const usePaginatedAPI = <T>(
  request: (query: FindQuery<T>) => Promise<PaginatedData<T>>,
  initialPageSize: number
) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sort, setSort] = useState<GridSortModel>([]);
  const api = useAPI(() =>
    request({
      pageIndex,
      pageSize,
      sort,
    })
  );

  useEffect(() => {
    api.callAPI();
  }, [pageIndex, pageSize, sort]);

  return {
    ...api,
    sort,
    pageIndex,
    pageSize,
    setSort,
    setPageIndex,
    setPageSize,
  };
};
