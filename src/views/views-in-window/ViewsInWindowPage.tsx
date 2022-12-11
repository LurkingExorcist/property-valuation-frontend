import './views-in-window-page.scss';

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

import { ViewInWindowEntity, ViewInWindowService } from '@/domain';

import { AppLayout } from '@/components/common/layout/app-layout';

import {
  ViewInWindowCreateModal,
  DataTable,
  DTColumn,
  ExtendedHeadCell,
  EditBodyCellInner,
  ViewInWindowEditModal,
} from '@/components';
import {
  usePaginatedAPI,
  useSelectionController,
  useModal,
  useBatchRemove,
  useSelectionColumns,
  useErrorHandler,
} from '@/hooks';

export function ViewsInWindowPage() {
  const handleError = useErrorHandler();

  const createModal = useModal(ViewInWindowCreateModal);
  const editModal = useModal(ViewInWindowEditModal);

  const {
    data: viewsInWindowData,
    where,
    pageIndex,
    pagesCount,
    setPageIndex,
    onChangeSort,
    onChangeFilter,
    callAPI: loadViewsInWindow,
  } = usePaginatedAPI(ViewInWindowService.loadViewsInWindow, {
    initialPageSize: 20,
  });

  const selectionController = useSelectionController({
    rows: viewsInWindowData?.content || [],
    identifier: 'id',
  });

  const openCreateModal = () =>
    createModal.show({ onSubmit: loadViewsInWindow });
  const openEditModal = (data: ViewInWindowEntity) =>
    editModal.show({ data, onSubmit: loadViewsInWindow });

  const batchRemove = useBatchRemove({
    where,
    selectionController,
    identifier: 'id',
    method: async (query) => {
      try {
        await ViewInWindowService.batchRemove(query);
        await loadViewsInWindow();
      } catch (err) {
        handleError(err);
      }
    },
  });

  const selectionColumns = useSelectionColumns({ selectionController });

  const columns = useMemo(
    (): DTColumn<ViewInWindowEntity>[] => [
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
          bodyCell: () => 'views-in-window-page__table-body-cell--edit',
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
    <AppLayout className="views-in-window-page" title="Виды из окна">
      <Paper className="views-in-window-page__card">
        <div className="views-in-window-page__controls">
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
        <div className="views-in-window-page__table-container">
          {viewsInWindowData ? (
            <DataTable
              className="views-in-window-page__table"
              identifier="id"
              classes={{
                bodyCell: 'views-in-window-page__table-body-cell',
              }}
              rows={viewsInWindowData.content}
              columns={[...selectionColumns, ...columns]}
              isStickyHeader
            />
          ) : (
            <LinearProgress />
          )}
        </div>
      </Paper>
      <div className="views-in-window-page__pagination-container">
        {viewsInWindowData && pagesCount > 1 && (
          <Pagination
            className="views-in-window-page__pagination"
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
