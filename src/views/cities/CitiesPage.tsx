import './cities-page.scss';

import { Delete } from '@mui/icons-material';
import {
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
} from '@mui/material';
import { useMemo } from 'react';

import { CityEntity, CityService } from '@/domain';

import { AppLayout } from '@/components/common/layout/app-layout';

import {
  CityCreateModal,
  DataTable,
  DTColumn,
  ExtendedHeadCell,
  EditBodyCellInner,
  CityEditModal,
} from '@/components';
import {
  usePaginatedAPI,
  useSelectionController,
  useModal,
  useBatchRemove,
  useSelectionColumns,
  useErrorHandler,
} from '@/hooks';

export function CitiesPage() {
  const handleError = useErrorHandler();

  const createModal = useModal(CityCreateModal);
  const editModal = useModal(CityEditModal);

  const {
    data: citiesData,
    where,
    pageIndex,
    pagesCount,
    setPageIndex,
    onChangeSort,
    onChangeFilter,
    callAPI: loadCities,
  } = usePaginatedAPI(CityService.loadCities, { initialPageSize: 20 });

  const selectionController = useSelectionController({
    rows: citiesData?.content || [],
    identifier: 'id',
  });

  const openCreateModal = () => createModal.show({ onSubmit: loadCities });
  const openEditModal = (data: CityEntity) =>
    editModal.show({ data, onSubmit: loadCities });

  const batchRemove = useBatchRemove({
    where,
    selectionController,
    identifier: 'id',
    method: async (query) => {
      try {
        await CityService.batchRemove(query);
        await loadCities();
      } catch (err) {
        handleError(err);
      }
    },
  });

  const selectionColumns = useSelectionColumns({ selectionController });

  const columns = useMemo(
    (): DTColumn<CityEntity>[] => [
      {
        id: 'name',
        label: 'Название',
        prop: 'name',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('name')}
            {...props}
          />
        ),
      },
      {
        id: 'region',
        label: 'Регион',
        prop: 'region',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('region')}
            {...props}
          />
        ),
      },
      {
        id: 'edit',
        classes: {
          bodyCell: () => 'cities-page__table-body-cell--edit',
        },
        bodyCellInnerRenderer: (props) => (
          <EditBodyCellInner
            onEdit={(props) => openEditModal(props.row)}
            {...props}
          />
        ),
      },
    ],
    []
  );

  return (
    <AppLayout className="cities-page" title="Города">
      <Paper className="cities-page__card">
        <div className="cities-page__controls">
          <Button variant="contained" onClick={openCreateModal}>
            Создать
          </Button>
          {selectionController.isPartialSelected && (
            <IconButton aria-label="delete" onClick={batchRemove}>
              <Delete color="error" />
            </IconButton>
          )}
        </div>
        <Divider />
        <div className="cities-page__table-container">
          {citiesData ? (
            <DataTable
              className="cities-page__table"
              identifier="id"
              classes={{
                bodyCell: 'cities-page__table-body-cell',
              }}
              rows={citiesData.content}
              columns={[...selectionColumns, ...columns]}
              isStickyHeader
            />
          ) : (
            <LinearProgress />
          )}
        </div>
      </Paper>
      <div className="cities-page__pagination-container">
        {citiesData && pagesCount > 1 && (
          <Pagination
            className="cities-page__pagination"
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
