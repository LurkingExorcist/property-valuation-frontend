import { Grid } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  MathModelService,
  MODEL_TRAIN_SCHEMA,
  MathModelTrainForm,
} from '@/domain';

import { useErrorHandler, useNotifications } from '@/hooks';
import { DataConverter } from '@/lib';

import { DatasetSelector } from './DatasetSelector';

import { FormControls, ModalLayout, ModalProps } from '../common';

import './math-model-train-modal.scss';

type Props = ModalProps & {
  id: string;
};

export function MathModelTrainModal({ id, close }: Props) {
  const notify = useNotifications();
  const handleError = useErrorHandler();

  const [output, setOutput] = useState('');

  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    setValue,
    trigger,
    reset,
  } = useForm<MathModelTrainForm>({
    ...DataConverter.schemeToFormProps(MODEL_TRAIN_SCHEMA),
  });

  const trainMathModel = async (form: MathModelTrainForm) => {
    try {
      const data = await MathModelService.trainMathModel({ id, form });
      setOutput(data.output);

      notify.push({
        title: 'Запись успешно изменена',
        color: 'success',
      });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <ModalLayout
      className="math-model-train-modal"
      title="Обучение математической модели"
      classNames={{
        content: 'math-model-train-modal__content',
      }}
      controls={
        <FormControls
          labels={{ submit: 'Обучить' }}
          isValid={isValid}
          isDirty={isDirty}
          onClickSubmit={handleSubmit(trainMathModel)}
          onClickReset={() => reset()}
        />
      }
      close={close}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="datasetId"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <DatasetSelector
                  name={field.name}
                  value={field.value}
                  error={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  onChange={(value) => {
                    setValue('datasetId', value);
                    trigger();
                  }}
                />
              );
            }}
          />
        </Grid>
        {output !== '' && (
          <Grid item xs={12}>
            <pre className="math-model-train-modal__train-output">{output}</pre>
          </Grid>
        )}
      </Grid>
    </ModalLayout>
  );
}
