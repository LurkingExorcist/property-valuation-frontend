import './apartments-page.scss';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Checkbox,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  ruRU,
} from '@mui/x-data-grid';
import * as _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import { Apartment, ApartmentService, ViewInWindowService } from '@/domain';

import { ApartmentCreateModal } from '@/components/apartments/ApartmentCreateModal';

import { AppLayout } from '@/layout/app-layout';

import { usePaginatedAPI, useAPI, useNotifications, useModals } from '@/hooks';
import { ApiError, Utils } from '@/lib';

const STATIC_COLUMNS: GridColDef<Apartment>[] = [
  {
    field: 'city.name',
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
    valueGetter: ({ row }) => row.totalArea + ' м²',
  },
  {
    field: 'kitchenArea',
    headerName: 'Кухонная площадь',
    valueGetter: ({ row }) => row.kitchenArea + ' м²',
  },
  {
    field: 'roomCount',
    headerName: 'Кол-во комнат',
    valueGetter: ({ row }) => row.roomCount,
  },
  {
    field: 'height',
    headerName: 'Высота',
    valueGetter: ({ row }) => row.height + ' м',
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

type Action = {
  icon: JSX.Element;
  name: string;
  onClick: () => void;
};

export function ApartmentsPage() {
  const notify = useNotifications();
  const modals = useModals();

  const {
    callAPI: loadApartments,
    isPending: apartmentsIsPending,
    data: apartmens,
    pageIndex,
    pageSize,
    setWhere,
    setSort,
    setPageIndex,
    setPageSize,
  } = usePaginatedAPI(ApartmentService.loadApartments, 20);

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const selectedApartments = useMemo(
    () =>
      selectionModel
        .map((id) => apartmens?.content.find((ap) => ap.id === id))
        .filter((apartment) => !_.isNil(apartment)) as Apartment[],
    [selectionModel]
  );

  const { callAPI: loadViewsInWindow, data: viewsInWindow } = useAPI(() =>
    ViewInWindowService.loadViewsInWindow()
  );

  useEffect(() => {
    Promise.all([loadApartments(), loadViewsInWindow()]).catch((err) =>
      notify.push(ApiError.fromError(err))
    );
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

  const actions: Action[] = [
    {
      icon: <AddIcon />,
      name: 'Добавить',
      onClick: () => modals.show(<ApartmentCreateModal />, {}),
    },
    selectedApartments.length === 1
      ? { icon: <EditIcon />, name: 'Редактировать' }
      : null,
    selectedApartments.length > 0
      ? { icon: <DeleteIcon />, name: 'Удалить' }
      : null,
  ].filter((action) => !_.isNil(action)) as Action[];

  return (
    <AppLayout className="apartments-page" title="Квартиры">
      <Paper className="apartments-page__card">
        <SpeedDial
          ariaLabel="Действия"
          sx={{ position: 'absolute', bottom: 54, right: 42 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action, idx) => (
            <SpeedDialAction
              key={idx}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          ))}
        </SpeedDial>
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
          selectionModel={selectionModel}
          onSortModelChange={(sort) => setSort(sort)}
          onPageChange={(newPage) => setPageIndex(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onFilterModelChange={(filter) =>
            setWhere({
              [filter.items[0].columnField]: [
                filter.items[0].operatorValue,
                filter.items[0].value,
              ],
            })
          }
          onSelectionModelChange={(newSelectionModel) =>
            setSelectionModel(newSelectionModel)
          }
          loading={apartmentsIsPending}
          checkboxSelection
        />
      </Paper>
    </AppLayout>
  );
}
