import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ROUTE_NAMES } from '@/config';

import { ApartmentsPage, AuthenticationPage } from '@/views';

export interface IAppRouterProps {}

export function AppRouter(props: IAppRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={ROUTE_NAMES.APARTMENTS} replace={true} />}
        />
        <Route path={ROUTE_NAMES.APARTMENTS} element={<ApartmentsPage />} />
        <Route
          path={ROUTE_NAMES.AUTHENTICATION}
          element={<AuthenticationPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
