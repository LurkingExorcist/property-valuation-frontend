import './auth-page.scss';

import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ROUTE_NAMES } from '@/config';

import { UserService } from '@/domain';

import logo from '@/assets/images/logo.svg';

import { useNotifications } from '@/hooks';
import { useAPI } from '@/hooks/useAPI';
import { AuthLayout } from '@/layout';
import { ApiError } from '@/lib';
import { AppDispatch } from '@/store';
import { authSlice } from '@/store/slices/auth-slice';

type Form = {
  username: string;
  password: string;
};

export function AuthenticationPage() {
  const notify = useNotifications();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Form>({
    username: '',
    password: '',
  });

  const { callAPI: signin, isPending } = useAPI(() => UserService.signin(form));

  const handleChange =
    (prop: keyof Form) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [prop]: event.target.value });
    };
  const onSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      await signin().then(
        (res) => res && dispatch(authSlice.actions.setToken(res.token))
      );

      navigate(ROUTE_NAMES.APARTMENTS);
    } catch (err) {
      const error = ApiError.fromError(err);
      notify.push({
        title: error.title,
      });
    }
  };

  return (
    <AuthLayout className="auth-page">
      <div className="auth-page__logo">
        <img className="auth-page__logo-icon" src={logo} />
        <div className="auth-page__logo-title">
          Модели оценки стоимости квартир
        </div>
      </div>
      <div className="auth-page__title">Войти в систему</div>
      <form className="auth-page__form" onSubmit={onSubmit}>
        <TextField
          value={form.username}
          name="login"
          className="auth-page__input"
          label="Логин"
          onChange={handleChange('username')}
        />
        <TextField
          value={form.password}
          name="password"
          className="auth-page__input"
          label="Пароль"
          type="password"
          onChange={handleChange('password')}
        />
        <LoadingButton
          className="auth-page__submit"
          variant="contained"
          size="large"
          type="submit"
          loading={isPending}
        >
          Войти
        </LoadingButton>
      </form>
    </AuthLayout>
  );
}
