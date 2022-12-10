import { Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import {
  CityEntity,
  CITY_EDIT_SCHEMA,
  CityEditForm,
  CityService,
} from '@/domain';

import { useErrorHandler, useNotifications } from '@/hooks';
import { DataConverter } from '@/lib';

import { ModalLayout, ModalProps, FormControls } from '../common';

import './city-edit-modal.scss';

type Props = ModalProps & {
  data: CityEntity;
  onSubmit: () => void;
};

export function CityEditModal({ data, close, onSubmit }: Props) {
  const notify = useNotifications();
  const handleError = useErrorHandler();

  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<CityEditForm>({
    ...DataConverter.schemeToFormProps(CITY_EDIT_SCHEMA, data),
  });

  const updateCity = async (form: CityEditForm) => {
    try {
      await CityService.updateCity({ id: data.id, form });
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
      className="city-edit-modal"
      title="Редактировать город"
      controls={
        <FormControls
          isValid={isValid}
          isDirty={isDirty}
          onClickSubmit={handleSubmit(updateCity)}
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
