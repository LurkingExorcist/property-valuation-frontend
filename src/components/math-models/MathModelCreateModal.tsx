import { Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import {
  MathModelEditForm,
  MathModelService,
  MATH_MODEL_SCHEMA,
} from '@/domain';

import { useErrorHandler, useNotifications } from '@/hooks';
import { DataConverter } from '@/lib';

import { ModelTypeSelecter } from './ModelTypeSelecter';

import { ModalLayout, ModalProps, FormControls } from '../common';

import './math-model-create-modal.scss';

type Props = ModalProps & {
  onSubmit: () => void;
};

export function MathModelCreateModal({ close, onSubmit }: Props) {
  const notify = useNotifications();
  const handleError = useErrorHandler();

  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    setValue,
    trigger,
    reset,
  } = useForm<MathModelEditForm>({
    ...DataConverter.schemeToFormProps(MATH_MODEL_SCHEMA),
  });

  const updateMathModel = async (form: MathModelEditForm) => {
    try {
      await MathModelService.createMathModel({ form });
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
      className="math-model-create-modal"
      title="Создать математическую модель"
      controls={
        <FormControls
          isValid={isValid}
          isDirty={isDirty}
          onClickSubmit={handleSubmit(updateMathModel)}
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
            name="modelTypeId"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <ModelTypeSelecter
                  name={field.name}
                  value={field.value}
                  error={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  onChange={(value) => {
                    setValue('modelTypeId', value);
                    trigger();
                  }}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="formula"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  label="Формула"
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
