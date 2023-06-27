import { Delete } from '@mui/icons-material';
import { Button, IconButton, Input } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import {
  ApartmentImportForm,
  ApartmentService,
  APARTMENT_IMPORT_SCHEMA,
} from '@/domain';

import { useErrorHandler, useNotifications } from '@/hooks';
import { DataConverter } from '@/lib';

import {
  ModalProps,
  ModalLayout,
  FormTable,
  FormField,
  FormControls,
} from '../common';

import './apartment-import-modal.scss';

type Props = ModalProps & {
  onImportDone: () => void;
};

export function ApartmentImportModal({ close, onImportDone }: Props) {
  const notify = useNotifications();
  const handleError = useErrorHandler();

  const {
    control,
    formState: { isValid, isDirty },
    setValue,
    trigger,
    watch,
    handleSubmit,
    reset,
  } = useForm<ApartmentImportForm>({
    ...DataConverter.schemeToFormProps(APARTMENT_IMPORT_SCHEMA),
  });

  const importApartments = async (form: ApartmentImportForm) => {
    try {
      const data = new FormData();

      data.append('source', form.source);
      data.append('file', form.file);

      notify.push({
        title: 'Подождите, идет импорт данных...',
        color: 'info',
      });

      await ApartmentService.importApartments(data);
      notify.push({
        title: 'Данные успешно импортированы',
        color: 'success',
      });

      close();
      onImportDone();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <ModalLayout
      className="apartment-import-modal"
      title="Импорт"
      controls={
        <FormControls
          isValid={isValid}
          isDirty={isDirty}
          onClickSubmit={handleSubmit(importApartments)}
          onClickReset={() => reset()}
        />
      }
      close={close}
    >
      <FormTable>
        <FormField label="Источник">
          <Controller
            name="source"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                placeholder="Введите название"
                error={!!fieldState.error}
                required
                {...field}
              />
            )}
          />
        </FormField>
        <FormField label="Файл (*.csv)">
          <div className="apartment-import-modal__file-uploader">
            <Button
              className="apartment-import-modal__file-uploader-btn"
              variant="outlined"
              component="label"
              sx={{ marginRight: 2 }}
            >
              Загрузить
              <input
                hidden
                accept="text/csv"
                multiple
                type="file"
                onChange={(e) => {
                  setValue('file', e.target.files?.[0]);
                  trigger();
                }}
              />
            </Button>
            <div className="apartment-import-modal__file-uploader-filename">
              {watch('file')?.name}
            </div>
            {watch('file') && (
              <IconButton
                onClick={() => {
                  setValue('file', null);
                  trigger();
                }}
              >
                <Delete fontSize="small" />{' '}
              </IconButton>
            )}
          </div>
        </FormField>
      </FormTable>
    </ModalLayout>
  );
}
