import './auth-page.scss';

import { Button, TextField } from '@mui/material';

import logo from '@/assets/images/logo.svg';

import { AuthLayout } from '@/layout';

export interface IAuthenticationPageProps {}

export function AuthenticationPage(props: IAuthenticationPageProps) {
  return (
    <AuthLayout className="auth-page">
      <div className="auth-page__logo">
        <img className="auth-page__logo-icon" src={logo} />
        <div className="auth-page__logo-title">
          Модели оценки стоимости квартир
        </div>
      </div>
      <div className="auth-page__title">Войти в систему</div>
      <TextField name="login" className="auth-page__input" label="Логин" />
      <TextField
        name="password"
        className="auth-page__input"
        label="Пароль"
        type="password"
      />
      <Button className="auth-page__submit" variant="contained">
        Войти
      </Button>
    </AuthLayout>
  );
}
