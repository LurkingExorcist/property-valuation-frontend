import {
  Divider,
  Grid,
  LinearProgress,
  Pagination,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import {
  ApartmentService,
  DatasetCreateForm,
  DatasetService,
  DATASET_CREATE_SCHEMA,
} from '@/domain';

import {
  useErrorHandler,
  useNotifications,
  usePaginatedAPI,
  useSelectionController,
} from '@/hooks';
import { DataConverter } from '@/lib';

import { ApartmentsTable } from '../apartments';
import { ModalLayout, ModalProps, FormControls } from '../common';

import './dataset-create-modal.scss';

type Props = ModalProps & {
  onSubmit: () => void;
};

export function DatasetCreateModal({ close, onSubmit }: Props) {
  const notify = useNotifications();
  const handleError = useErrorHandler();

  const {
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

  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<DatasetCreateForm>({
    ...DataConverter.schemeToFormProps(DATASET_CREATE_SCHEMA),
  });

  const updateDataset = async (form: DatasetCreateForm) => {
    try {
      await DatasetService.createDataset({
        form: { ...form, datasetQuery: where },
      });
      notify.push({
        title: 'Запись успешно создана',
        color: 'success',
      });

      close();

      onSubmit();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <ModalLayout
      className="dataset-create-modal"
      title="Создать датасет"
      classNames={{
        content: 'dataset-create-modal__content',
      }}
      controls={
        <FormControls
          isValid={isValid}
          isDirty={isDirty}
          onClickSubmit={handleSubmit(updateDataset)}
          onClickReset={() => reset()}
        />
      }
      close={close}
    >
      <Grid className="dataset-create-modal__form" container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Название"
                variant="standard"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="splitRatio"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Соотношение train:test"
                variant="standard"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  label="Описание"
                  variant="outlined"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  multiline
                  fullWidth
                  {...field}
                />
              );
            }}
          />
        </Grid>
      </Grid>
      <Divider />
      <div className="dataset-create-modal__table-container">
        {apartmentsData ? (
          <ApartmentsTable
            className="dataset-create-modal__table"
            rows={apartmentsData.content}
            selectionController={selectionController}
            onChangeFilter={onChangeFilter}
            onChangeSort={onChangeSort}
          />
        ) : (
          <LinearProgress />
        )}
      </div>
      <div className="dataset-create-modal__pagination-container">
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
    </ModalLayout>
  );
}
