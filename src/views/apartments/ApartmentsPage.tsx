import './apartments-page.scss';

import { Alert, Checkbox, Paper, Snackbar } from '@mui/material';
import { DataGrid, GridColDef, ruRU } from '@mui/x-data-grid';
import * as _ from 'lodash';
import { useEffect, useMemo } from 'react';

import { Apartment, ApartmentService, ViewInWindowService } from '@/domain';

import { AppLayout } from '@/layout/app-layout';

import { usePaginatedAPI, useAPI } from '@/hooks';
import { Utils } from '@/lib';

const STATIC_COLUMNS: GridColDef<Apartment>[] = [
  {
    field: 'city',
    headerName: 'Город',
    width: 150,
    valueGetter: ({ row }) => row.city.name,
  },
  {
    field: 'floor',
    headerName: 'Этаж',
    valueGetter: ({ row }) => row.floor,
  },
  {
    field: 'totalArea',
    headerName: 'Общая площадь',
    valueGetter: ({ row }) => row.totalArea,
  },
  {
    field: 'kitchenArea',
    headerName: 'Кухонная площадь',
    valueGetter: ({ row }) => row.kitchenArea,
  },
  {
    field: 'roomCount',
    headerName: 'Кол-во комнат',
    valueGetter: ({ row }) => row.roomCount,
  },
  {
    field: 'height',
    headerName: 'Высота',
    valueGetter: ({ row }) => row.height,
  },
  {
    field: 'totalPrice',
    headerName: 'Стоимость',
    width: 150,
    valueGetter: ({ row }) => Utils.formatCurrency(row.totalPrice),
  },
  {
    field: 'isStudio',
    headerName: 'Студия?',
    renderCell: (props) => <Checkbox checked={props.row.isStudio} disabled />,
    width: 80,
  },
];

export function ApartmentsPage() {
  const {
    callAPI: loadApartments,
    resetState: resetApartments,
    isPending: apartmentsIsPending,
    error: apartmensError,
    data: apartmens,
    pageIndex,
    pageSize,
    setSort,
    setPageIndex,
    setPageSize,
  } = usePaginatedAPI(ApartmentService.loadApartments, 20);

  const {
    callAPI: loadViewsInWindow,
    resetState: resetViews,
    error: viewsError,
    data: viewsInWindow,
  } = useAPI(() => ViewInWindowService.loadViewsInWindow());

  useEffect(() => {
    loadApartments();
    loadViewsInWindow();
  }, []);

  const dynamicColumns = useMemo(
    () =>
      viewsInWindow?.content.map<GridColDef<Apartment>>((view) => ({
        field: view.name,
        description: view.description,
        headerName: _.capitalize(view.name.split('_')[1]),
        valueGetter: ({ row }) =>
          !!row.viewsInWindow.find((vi) => vi.name === view.name),
        renderCell: (props) => <Checkbox checked={props.value} disabled />,
        width: 80,
      })) || [],
    [viewsInWindow]
  );

  return (
    <AppLayout className="apartments-page" title="Квартиры">
      <Snackbar
        open={!!apartmensError}
        autoHideDuration={6000}
        onClose={resetApartments}
      >
        <Alert
          onClose={resetApartments}
          severity="error"
          sx={{ width: '100%' }}
        >
          {apartmensError && apartmensError.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!viewsError}
        autoHideDuration={6000}
        onClose={resetViews}
      >
        <Alert onClose={resetViews} severity="error" sx={{ width: '100%' }}>
          {viewsError && viewsError.message}
        </Alert>
      </Snackbar>
      <Paper className="apartments-page__card">
        <DataGrid
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          rows={apartmens?.content || []}
          columns={[...STATIC_COLUMNS, ...dynamicColumns]}
          sortingMode="server"
          paginationMode="server"
          filterMode="server"
          rowCount={apartmens?.total || 0}
          pageSize={pageSize}
          page={pageIndex}
          onSortModelChange={(sort) => setSort(sort)}
          onPageChange={(newPage) => setPageIndex(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onFilterModelChange={(filter) => console.log(filter)}
          loading={apartmentsIsPending}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>
    </AppLayout>
  );
}
