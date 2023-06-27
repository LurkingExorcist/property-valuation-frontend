import * as React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AccessRight } from '@/domain';

import { ROUTE_NAMES } from '@/constants';
import { useUser } from '@/hooks';
import { RootState } from '@/store';

type RestrictionRules = Omit<AccessRight, 'id'>[];

type Props = React.PropsWithChildren<{
  mock: React.ReactNode;
  rules: RestrictionRules;
}>;

export const Restricted = ({ mock, rules, children }: Props) => {
  const user = useUser();
  const isLoggedIn = useSelector<RootState, boolean>(
    (state) => !!state.auth.token
  );

  if (!isLoggedIn) {
    return <Navigate to={ROUTE_NAMES.AUTHENTICATION} replace={true} />;
  }

  if (
    user &&
    rules?.every(
      (rule) =>
        !!user.accessRights.find(
          (right) =>
            right.domainEntity === rule.domainEntity &&
            right.accessLevel >= rule.accessLevel
        )
    )
  ) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return <React.Fragment>{mock}</React.Fragment>;
};
