import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { Restricted } from '@/components';
import { DOMAIN_ENTITY_TYPES, ROUTE_NAMES } from '@/constants';
import {
  ApartmentsPage,
  AuthenticationPage,
  CitiesPage,
  MainPage,
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
      </Route>
      <Route
        path={ROUTE_NAMES.AUTHENTICATION}
        element={<AuthenticationPage />}
      />
    </Routes>
  );
}
