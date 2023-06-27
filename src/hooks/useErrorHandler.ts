import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import * as _ from 'lodash';
import { useNavigate } from 'react-router-dom';

import { ROUTE_NAMES } from '@/constants';
import { ApiError, Utils } from '@/lib';

import { useNotifications } from './useNotifications';

export const useErrorHandler = () => {
  const navigate = useNavigate();
  const notify = useNotifications();

  return (error: unknown) => {
    const apiError = ApiError.fromError(error);
    notify.push({
      ...apiError,
      color: 'error',
    });

    console.error(apiError);

    // eslint-disable-next-line import/no-named-as-default-member
    if (axios.isAxiosError(error)) {
      _.cond([
        [
          Utils.equals(StatusCodes.UNAUTHORIZED),
          () => navigate(ROUTE_NAMES.AUTHENTICATION),
        ],
      ])(error.response?.status);
    }
  };
};
