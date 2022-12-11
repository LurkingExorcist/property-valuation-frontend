import { Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import {
  UserEntity,
  UserEditForm,
  UserService,
  USER_EDIT_SCHEMA,
} from '@/domain';

import { useErrorHandler, useNotifications } from '@/hooks';
import { DataConverter } from '@/lib';

import { AccessRightsSelector } from './AccessRightsSelector';

import { ModalLayout, ModalProps, FormControls } from '../common';

import './user-edit-modal.scss';

type Props = ModalProps & {
  data: UserEntity;
  onSubmit: () => void;
};

export function UserEditModal({ data, close, onSubmit }: Props) {
  const notify = useNotifications();
  const handleError = useErrorHandler();

  const {
    control,
    formState: { isValid, isDirty },
    setValue,
    handleSubmit,
    trigger,
    reset,
  } = useForm<UserEditForm>({
    ...DataConverter.schemeToFormProps(USER_EDIT_SCHEMA, {
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber,
      accessRights: data.accessRights,
      password: '',
      passwordConfirmation: '',
    }),
  });

  const updateUser = async (form: UserEditForm) => {
    try {
      await UserService.updateUser({ id: data.id, form });
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
      className="user-edit-modal"
      title="Редактировать пользователя"
      classNames={{
        content: 'user-edit-modal__content',
      }}
      controls={
        <FormControls
          isValid={isValid}
          isDirty={isDirty}
          onClickSubmit={handleSubmit(updateUser)}
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
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Email"
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
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Логин"
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
            name="phoneNumber"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Номер телефона"
                variant="standard"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Пароль"
                variant="standard"
                type="password"
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
            name="passwordConfirmation"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Подтвердите пароль"
                variant="standard"
                type="password"
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
            name="accessRights"
            control={control}
            render={({ field, fieldState }) => (
              <AccessRightsSelector
                name={field.name}
                value={field.value}
                error={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                onChange={(accessRights) => {
                  setValue('accessRights', accessRights);
                  trigger();
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </ModalLayout>
  );
}
