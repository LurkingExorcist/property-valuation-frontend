import { Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { UserEditForm, UserService, USER_EDIT_SCHEMA } from '@/domain';

import { useErrorHandler, useNotifications } from '@/hooks';
import { DataConverter } from '@/lib';

import { AccessRightsSelector } from './AccessRightsSelector';

import { ModalLayout, ModalProps, FormControls } from '../common';

import './user-create-modal.scss';

type Props = ModalProps & { onSubmit: () => void };

export function UserCreateModal({ close, onSubmit }: Props) {
  const notify = useNotifications();
  const handleError = useErrorHandler();

  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    setValue,
    trigger,
    reset,
  } = useForm<UserEditForm>({
    ...DataConverter.schemeToFormProps(USER_EDIT_SCHEMA),
  });

  const createUser = async (form: UserEditForm) => {
    try {
      await UserService.createUser({ form });
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
      className="user-create-modal"
      title="Создать пользователя"
      classNames={{
        content: 'user-create-modal__content',
      }}
      controls={
        <FormControls
          isValid={isValid}
          isDirty={isDirty}
          onClickSubmit={handleSubmit(createUser)}
          onClickReset={() => reset()}
        />
      }
      close={close}
    >
      <Grid container spacing={2}>
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
