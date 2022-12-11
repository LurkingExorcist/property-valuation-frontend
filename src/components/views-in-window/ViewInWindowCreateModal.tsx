import { Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import {
  ViewInWindowEditForm,
  ViewInWindowService,
  VIEW_IN_WINDOW_EDIT_SCHEMA,
} from '@/domain';

import { useErrorHandler, useNotifications } from '@/hooks';
import { DataConverter } from '@/lib';

import { ModalLayout, ModalProps, FormControls } from '../common';

type Props = ModalProps & { onSubmit: () => void };

export function ViewInWindowCreateModal({ close, onSubmit }: Props) {
  const notify = useNotifications();
  const handleError = useErrorHandler();

  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<ViewInWindowEditForm>({
    ...DataConverter.schemeToFormProps(VIEW_IN_WINDOW_EDIT_SCHEMA),
  });

  const createViewInWindow = async (form: ViewInWindowEditForm) => {
    try {
      await ViewInWindowService.createViewInWindow({ form });
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
      title="Создать город"
      controls={
        <FormControls
          isValid={isValid}
          isDirty={isDirty}
          onClickSubmit={handleSubmit(createViewInWindow)}
          onClickReset={() => reset()}
        />
      }
      close={close}
    >
      <Grid container spacing={2}>
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
                  label="Регион"
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
