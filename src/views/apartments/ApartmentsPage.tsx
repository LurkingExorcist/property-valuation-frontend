import './apartments-page.scss';

import { Delete } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  Divider,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
} from '@mui/material';
import { useMemo } from 'react';

import { ApartmentEntity, ApartmentService } from '@/domain';

import {
  DataTable,
  DTColumn,
  ExtendedHeadCell,
  AppLayout,
  ApartmentImportModal,
} from '@/components';
import {
  usePaginatedAPI,
  useErrorHandler,
  useModal,
  useSelectionController,
  useBatchRemove,
  useSelectionColumns,
} from '@/hooks';

export function ApartmentsPage() {
  const modals = useModal(ApartmentImportModal);

  const handleError = useErrorHandler();

  const {
    callAPI: loadApartments,
    data: apartmentsData,
    where,
    pageIndex,
    pagesCount,
    setPageIndex,
    onChangeSort,
    onChangeFilter,
  } = usePaginatedAPI(ApartmentService.loadApartments, {
    initialPageSize: 20,
  });

  const selectionController = useSelectionController({
    rows: apartmentsData?.content || [],
    identifier: 'id',
  });

  const openImportModal = () =>
    modals.show({
      onImportDone: () => loadApartments().catch(handleError),
    });

  const batchRemove = useBatchRemove({
    where,
    selectionController,
    identifier: 'id',
    method: async (query) => {
      try {
        await ApartmentService.batchRemove(query);
        await loadApartments();
      } catch (err) {
        handleError(err);
      }
    },
  });

  const selectionColumns = useSelectionColumns({ selectionController });

  const columns = useMemo(
    (): DTColumn<ApartmentEntity>[] => [
      {
        id: 'source',
        label: 'Источник',
        prop: 'source',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('source')}
            {...props}
          />
        ),
      },
      {
        id: 'city',
        label: 'Город',
        prop: 'city.name',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('city.name')}
            {...props}
          />
        ),
      },
      {
        id: 'floor',
        label: 'Этаж',
        prop: 'floor',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('floor')}
            {...props}
          />
        ),
      },
      {
        id: 'height',
        label: 'Высота',
        prop: 'height',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('height')}
            {...props}
          />
        ),
      },
      {
        id: 'roomCount',
        label: 'Количество комнат',
        prop: 'roomCount',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('roomCount')}
            {...props}
          />
        ),
      },
      {
        id: 'kitchenArea',
        label: 'Площадь кухни (кв. м.)',
        prop: 'kitchenArea',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('kitchenArea')}
            {...props}
          />
        ),
      },
      {
        id: 'livingArea',
        label: 'Жилая площадь (кв. м.)',
        prop: 'livingArea',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('livingArea')}
            {...props}
          />
        ),
      },
      {
        id: 'totalArea',
        label: 'Общая площадь (кв. м.)',
        prop: 'totalArea',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('totalArea')}
            {...props}
          />
        ),
      },
      {
        id: 'isStudio',
        label: 'Студия?',
        prop: 'isStudio',
        bodyCellInnerRenderer: (props) => (
          <Checkbox checked={props.value} disabled />
        ),
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('isStudio')}
            {...props}
          />
        ),
      },
      {
        id: 'viewsInWindow',
        label: 'Виды из окна',
        prop: 'viewsInWindow',
        bodyCellInnerRenderer: (props) => (
          <div className="apartments-page__views-in-window">
            {props.row.viewsInWindow.map((view) => view.description).join('; ')}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <AppLayout className="apartments-page" title="Квартиры">
      <Paper className="apartments-page__card">
        <div className="apartments-page__controls">
          <Button variant="contained" onClick={openImportModal}>
            Импорт
          </Button>
          {selectionController.isPartialSelected && (
            <IconButton aria-label="delete" onClick={batchRemove}>
              <Delete color="error" />
            </IconButton>
          )}
        </div>
        <Divider />
        <div className="apartments-page__table-container">
          {apartmentsData ? (
            <DataTable
              className="apartments-page__table"
              identifier="id"
              rows={apartmentsData.content}
              columns={[...selectionColumns, ...columns]}
              isStickyHeader
            />
          ) : (
            <LinearProgress />
          )}
        </div>
      </Paper>
      <div className="apartments-page__pagination-container">
        {apartmentsData && pagesCount > 1 && (
          <Pagination
            className="apartments-page__pagination"
            page={pageIndex}
            count={pagesCount}
            color="primary"
            onChange={(e, page) => setPageIndex(page)}
          />
        )}
      </div>
    </AppLayout>
  );
}
