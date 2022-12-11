import { Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import {
  DatasetEntity,
  DatasetEditForm,
  DatasetService,
  DATASET_EDIT_SCHEMA,
} from '@/domain';

import { useErrorHandler, useNotifications } from '@/hooks';
import { DataConverter } from '@/lib';

import { ModalLayout, ModalProps, FormControls } from '../common';

import './dataset-edit-modal.scss';

type Props = ModalProps & {
  data: DatasetEntity;
  onSubmit: () => void;
};

export function DatasetEditModal({ data, close, onSubmit }: Props) {
  const notify = useNotifications();
  const handleError = useErrorHandler();

  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<DatasetEditForm>({
    ...DataConverter.schemeToFormProps(DATASET_EDIT_SCHEMA, {
      description: data.description,
    }),
  });

  const updateDataset = async (form: DatasetEditForm) => {
    try {
      await DatasetService.updateDataset({ id: data.id, form });
      notify.push({
        title: 'Запись успешно изменена',
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
      className="dataset-edit-modal"
      title="Редактировать датасет"
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="ID"
            variant="standard"
            value={data.id}
            disabled
            fullWidth
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
    </ModalLayout>
  );
}
