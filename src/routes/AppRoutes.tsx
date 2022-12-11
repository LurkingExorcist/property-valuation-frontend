import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { Restricted } from '@/components';
import { DOMAIN_ENTITY_TYPES, ROUTE_NAMES } from '@/constants';
import {
  ApartmentsPage,
  AuthenticationPage,
  CitiesPage,
  ViewsInWindowPage,
  MainPage,
  UsersPage,
  MathModelsPage,
} from '@/views';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<MainPage />} />
        <Route
          path={ROUTE_NAMES.APARTMENTS}
          element={
            <Restricted
              mock={<Navigate to={ROUTE_NAMES.MAIN} replace={true} />}
              rules={[
                {
                  domainEntity: DOMAIN_ENTITY_TYPES.APARTMENT,
                  accessLevel: 1,
                },
              ]}
            >
              <ApartmentsPage />
            </Restricted>
          }
        />
        <Route
          path={ROUTE_NAMES.CITIES}
          element={
            <Restricted
              mock={<Navigate to={ROUTE_NAMES.MAIN} replace={true} />}
              rules={[
                {
                  domainEntity: DOMAIN_ENTITY_TYPES.CITY,
                  accessLevel: 1,
                },
              ]}
            >
              <CitiesPage />
            </Restricted>
          }
        />
        <Route
          path={ROUTE_NAMES.VIEWS_IN_WINDOW}
          element={
            <Restricted
              mock={<Navigate to={ROUTE_NAMES.MAIN} replace={true} />}
              rules={[
                {
                  domainEntity: DOMAIN_ENTITY_TYPES.VIEW_IN_WINDOW,
                  accessLevel: 1,
                },
              ]}
            >
              <ViewsInWindowPage />
            </Restricted>
          }
        />
        <Route
          path={ROUTE_NAMES.USERS}
          element={
            <Restricted
              mock={<Navigate to={ROUTE_NAMES.MAIN} replace={true} />}
              rules={[
                {
                  domainEntity: DOMAIN_ENTITY_TYPES.USER,
                  accessLevel: 1,
                },
              ]}
            >
              <UsersPage />
            </Restricted>
          }
        />
        <Route
          path={ROUTE_NAMES.MATH_MODELS}
          element={
            <Restricted
              mock={<Navigate to={ROUTE_NAMES.MAIN} replace={true} />}
              rules={[
                {
                  domainEntity: DOMAIN_ENTITY_TYPES.MATH_MODEL,
                  accessLevel: 1,
                },
              ]}
            >
              <MathModelsPage />
            </Restricted>
          }
        />
      </Route>
      <Route
        path={ROUTE_NAMES.AUTHENTICATION}
        element={<AuthenticationPage />}
      />
    </Routes>
  );
}
