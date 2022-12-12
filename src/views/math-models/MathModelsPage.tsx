import './math-models-page.scss';

import { BatchPrediction, Delete, ModelTraining } from '@mui/icons-material';
import {
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
} from '@mui/material';
import { useMemo } from 'react';

import { MathModelEntity, MathModelService } from '@/domain';

import { AppLayout } from '@/components/common/layout/app-layout';

import {
  MathModelCreateModal,
  DataTable,
  DTColumn,
  ExtendedHeadCell,
  EditBodyCellInner,
  MathModelEditModal,
  MathModelTrainModal,
  MathModelPredictModal,
} from '@/components';
import {
  usePaginatedAPI,
  useSelectionController,
  useModal,
  useBatchRemove,
  useSelectionColumns,
  useErrorHandler,
} from '@/hooks';

export function MathModelsPage() {
  const handleError = useErrorHandler();

  const trainModal = useModal(MathModelTrainModal);
  const predictModal = useModal(MathModelPredictModal);

  const createModal = useModal(MathModelCreateModal);
  const editModal = useModal(MathModelEditModal);

  const {
    data: mathModelsData,
    where,
    pageIndex,
    pagesCount,
    setPageIndex,
    onChangeSort,
    onChangeFilter,
    callAPI: loadMathModels,
  } = usePaginatedAPI(MathModelService.loadMathModels, { initialPageSize: 20 });

  const selectionController = useSelectionController({
    rows: mathModelsData?.content || [],
    identifier: 'id',
  });

  const openTrainModal = (id: string) => trainModal.show({ id });
  const openPredictModal = (id: string) => predictModal.show({ id });

  const openCreateModal = () => createModal.show({ onSubmit: loadMathModels });
  const openEditModal = (data: MathModelEntity) =>
    editModal.show({ data, onSubmit: loadMathModels });

  const batchRemove = useBatchRemove({
    where,
    selectionController,
    identifier: 'id',
    method: async (query) => {
      try {
        await MathModelService.batchRemove(query);
        await loadMathModels();
      } catch (err) {
        handleError(err);
      }
    },
  });

  const selectionColumns = useSelectionColumns({ selectionController });

  const columns = useMemo(
    (): DTColumn<MathModelEntity>[] => [
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
        id: 'modelType',
        label: 'Тип модели',
        prop: 'modelType.name',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('modelType.name')}
            {...props}
          />
        ),
      },
      {
        id: 'formula',
        label: 'Формула',
        prop: 'formula',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('formula')}
            {...props}
          />
        ),
      },
      {
        id: 'edit',
        classes: {
          bodyCell: () => 'math-models-page__table-body-cell--control',
        },
        bodyCellInnerRenderer: (props) => (
          <EditBodyCellInner
            onEdit={(props) => openEditModal(props.row)}
            {...props}
          />
        ),
      },
      {
        id: 'train',
        classes: {
          bodyCell: () => 'math-models-page__table-body-cell--control',
        },
        bodyCellInnerRenderer: (props) => (
          <IconButton onClick={() => openTrainModal(props.row.id)}>
            <ModelTraining fontSize="small" />
          </IconButton>
        ),
      },
      {
        id: 'predict',
        classes: {
          bodyCell: () => 'math-models-page__table-body-cell--control',
        },
        bodyCellInnerRenderer: (props) => (
          <IconButton onClick={() => openPredictModal(props.row.id)}>
            <BatchPrediction fontSize="small" />
          </IconButton>
        ),
      },
    ],
    []
  );

  return (
    <AppLayout className="math-models-page" title="Математические модели">
      <Paper className="math-models-page__card">
        <div className="math-models-page__controls">
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
        <div className="math-models-page__table-container">
          {mathModelsData ? (
            <DataTable
              className="math-models-page__table"
              identifier="id"
              classes={{
                bodyCell: 'math-models-page__table-body-cell',
              }}
              rows={mathModelsData.content}
              columns={[...selectionColumns, ...columns]}
              isStickyHeader
            />
          ) : (
            <LinearProgress />
          )}
        </div>
      </Paper>
      <div className="math-models-page__pagination-container">
        {mathModelsData && pagesCount > 1 && (
          <Pagination
            className="math-models-page__pagination"
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
