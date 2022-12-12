import { Checkbox, Divider, Grid } from '@mui/material';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  MathModelService,
  MathModelPredictForm,
  MODEL_PREDICT_SCHEMA,
} from '@/domain';

import { PredictedApartment } from '@/domain/math-model/types/PredictedApartment';
import { useErrorHandler, useNotifications } from '@/hooks';
import { DataConverter, Utils } from '@/lib';

import { DatasetSelector } from './DatasetSelector';

import {
  ModalLayout,
  ModalProps,
  FormControls,
  DTColumn,
  DataTable,
} from '../common';

import './math-model-predict-modal.scss';

type Props = ModalProps & {
  id: string;
};

export function MathModelPredictModal({ id, close }: Props) {
  const notify = useNotifications();
  const handleError = useErrorHandler();

  const [predictedData, setPredictedData] = useState<PredictedApartment[]>([]);

  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    setValue,
    trigger,
    reset,
  } = useForm<MathModelPredictForm>({
    ...DataConverter.schemeToFormProps(MODEL_PREDICT_SCHEMA),
  });

  const updateMathModel = async (form: MathModelPredictForm) => {
    try {
      await MathModelService.predictMathModel({ id, form }).then((data) =>
        setPredictedData(data)
      );
      notify.push({
        title: 'Запись успешно создана',
        color: 'success',
      });
    } catch (err) {
      handleError(err);
    }
  };

  const columns = useMemo(
    (): DTColumn<PredictedApartment>[] => [
      {
        id: 'city',
        label: 'Город',
        prop: 'city',
      },
      {
        id: 'floor',
        label: 'Этаж',
        prop: 'floor',
      },
      {
        id: 'height',
        label: 'Высота',
        prop: 'height',
      },
      {
        id: 'roomCount',
        label: 'Количество комнат',
        prop: 'room_count',
      },
      {
        id: 'kitchenArea',
        label: 'Площадь кухни (кв. м.)',
        prop: 'kitchen_area',
      },
      {
        id: 'livingArea',
        label: 'Жилая площадь (кв. м.)',
        prop: 'living_area',
      },
      {
        id: 'totalArea',
        label: 'Общая площадь (кв. м.)',
        prop: 'total_area',
      },
      {
        id: 'isStudio',
        label: 'Студия?',
        prop: 'is_studio',
        bodyCellInnerRenderer: (props) => (
          <Checkbox checked={props.value} disabled />
        ),
      },
      {
        id: 'totalPrice',
        label: 'Общая стоимость',
        prop: 'total_price',
        display: Utils.formatCurrency,
      },
      {
        id: 'totalPricePred',
        label: 'Предсказанная стоимость',
        prop: 'total_price_pred',
        display: Utils.formatCurrency,
      },
      {
        id: 'differenceVal',
        label: 'Разница',
        prop: 'difference_val',
        display: Utils.formatCurrency,
      },
      {
        id: 'differencePercent',
        label: 'Процент разницы',
        prop: 'difference_percent',
        display: Utils.formatPercent,
      },
    ],
    []
  );

  return (
    <ModalLayout
      className="math-model-predict-modal"
      title="Прогнозирование"
      classNames={{
        content: 'math-model-predict-modal__content',
      }}
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
      <Grid className="math-model-predict-modal__form" container spacing={2}>
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
      </Grid>
      <Divider />
      <div className="math-model-predict-modal__table-container">
        {predictedData.length > 0 && (
          <DataTable
            className="math-model-predict-modal__table"
            identifier="index"
            rows={predictedData}
            columns={columns}
            isStickyHeader
          />
        )}
      </div>
    </ModalLayout>
  );
}
