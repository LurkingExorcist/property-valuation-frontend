import { Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import {
  ViewInWindowEntity,
  VIEW_IN_WINDOW_EDIT_SCHEMA,
  ViewInWindowEditForm,
  ViewInWindowService,
} from '@/domain';

import { useErrorHandler, useNotifications } from '@/hooks';
import { DataConverter } from '@/lib';

import { ModalLayout, ModalProps, FormControls } from '../common';

import './view-in-window-edit-modal.scss';

type Props = ModalProps & {
  data: ViewInWindowEntity;
  onSubmit: () => void;
};

export function ViewInWindowEditModal({ data, close, onSubmit }: Props) {
  const notify = useNotifications();
  const handleError = useErrorHandler();

  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<ViewInWindowEditForm>({
    ...DataConverter.schemeToFormProps(VIEW_IN_WINDOW_EDIT_SCHEMA, data),
  });

  const updateViewInWindow = async (form: ViewInWindowEditForm) => {
    try {
      await ViewInWindowService.updateViewInWindow({ id: data.id, form });
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
      className="viewInWindow-edit-modal"
      title="Редактировать город"
      controls={
        <FormControls
          isValid={isValid}
          isDirty={isDirty}
          onClickSubmit={handleSubmit(updateViewInWindow)}
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
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  label="Описание"
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
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
