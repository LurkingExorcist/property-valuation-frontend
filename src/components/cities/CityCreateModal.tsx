import { Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { CityEditForm, CityService, CITY_EDIT_SCHEMA } from '@/domain';

import { useErrorHandler, useNotifications } from '@/hooks';
import { DataConverter } from '@/lib';

import { ModalLayout, ModalProps, FormControls } from '../common';

type Props = ModalProps & { onSubmit: () => void };

export function CityCreateModal({ close, onSubmit }: Props) {
  const notify = useNotifications();
  const handleError = useErrorHandler();

  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<CityEditForm>({
    ...DataConverter.schemeToFormProps(CITY_EDIT_SCHEMA),
  });

  const createCity = async (form: CityEditForm) => {
    try {
      await CityService.createCity({ form });
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
          onClickSubmit={handleSubmit(createCity)}
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
            name="region"
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
