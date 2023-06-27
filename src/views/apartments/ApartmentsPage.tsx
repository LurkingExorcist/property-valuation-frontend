import './apartments-page.scss';

import { Delete } from '@mui/icons-material';
import {
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
} from '@mui/material';

import { ApartmentService } from '@/domain';

import { AppLayout, ApartmentImportModal, ApartmentsTable } from '@/components';
import {
  usePaginatedAPI,
  useErrorHandler,
  useModal,
  useSelectionController,
  useBatchRemove,
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
            <ApartmentsTable
              className="apartments-page__table"
              rows={apartmentsData.content}
              selectionController={selectionController}
              onChangeFilter={onChangeFilter}
              onChangeSort={onChangeSort}
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
