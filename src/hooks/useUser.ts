import * as _ from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserEntity, UserService } from '@/domain';

import { AppDispatch, RootState } from '@/store';
import { authSlice } from '@/store/slices/auth-slice';

import { useAPI } from './useAPI';

export const useUser = () => {
  const { callAPI: loadUser } = useAPI(UserService.loadUser);
  const user = useSelector<RootState, UserEntity | null>(
    (state) => state.auth.user
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (_.isNull(user)) {
      loadUser().then(
        (user) => !_.isNil(user) && dispatch(authSlice.actions.setUser(user))
      );
    }
  }, [user]);

  return user;
};
