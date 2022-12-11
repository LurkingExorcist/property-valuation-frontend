import './datasets-page.scss';

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

import { DatasetEntity, DatasetService } from '@/domain';

import { AppLayout } from '@/components/common/layout/app-layout';

import {
  DatasetCreateModal,
  DataTable,
  DTColumn,
  ExtendedHeadCell,
  EditBodyCellInner,
  DatasetEditModal,
} from '@/components';
import {
  usePaginatedAPI,
  useSelectionController,
  useModal,
  useBatchRemove,
  useSelectionColumns,
  useErrorHandler,
} from '@/hooks';

export function DatasetsPage() {
  const handleError = useErrorHandler();

  const createModal = useModal(DatasetCreateModal);
  const editModal = useModal(DatasetEditModal);

  const {
    data: datasetsData,
    where,
    pageIndex,
    pagesCount,
    setPageIndex,
    onChangeSort,
    onChangeFilter,
    callAPI: loadDatasets,
  } = usePaginatedAPI(DatasetService.loadDatasets, { initialPageSize: 20 });

  const selectionController = useSelectionController({
    rows: datasetsData?.content || [],
    identifier: 'id',
  });

  const openCreateModal = () => createModal.show({ onSubmit: loadDatasets });
  const openEditModal = (data: DatasetEntity) =>
    editModal.show({ data, onSubmit: loadDatasets });

  const batchRemove = useBatchRemove({
    where,
    selectionController,
    identifier: 'id',
    method: async (query) => {
      try {
        await DatasetService.batchRemove(query);
        await loadDatasets();
      } catch (err) {
        handleError(err);
      }
    },
  });

  const selectionColumns = useSelectionColumns({ selectionController });

  const columns = useMemo(
    (): DTColumn<DatasetEntity>[] => [
      {
        id: 'name',
        label: 'Логин',
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
        id: 'description',
        label: 'Описание',
        prop: 'description',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('description')}
            {...props}
          />
        ),
      },
      {
        id: 'edit',
        classes: {
          bodyCell: () => 'datasets-page__table-body-cell--edit',
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
    <AppLayout className="datasets-page" title="Пользователи">
      <Paper className="datasets-page__card">
        <div className="datasets-page__controls">
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
        <div className="datasets-page__table-container">
          {datasetsData ? (
            <DataTable
              className="datasets-page__table"
              identifier="id"
              classes={{
                bodyCell: 'datasets-page__table-body-cell',
              }}
              rows={datasetsData.content}
              columns={[...selectionColumns, ...columns]}
              isStickyHeader
            />
          ) : (
            <LinearProgress />
          )}
        </div>
      </Paper>
      <div className="datasets-page__pagination-container">
        {datasetsData && pagesCount > 1 && (
          <Pagination
            className="datasets-page__pagination"
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
