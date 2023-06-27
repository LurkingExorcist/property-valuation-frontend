import axios from 'axios';
import * as _ from 'lodash';

import { API_URL, LS_TOKEN } from '@/constants';

export const requester = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Headers': 'content-type, Authorization',
    'Content-Type': 'application/json',
  },
});

requester.interceptors.request.use(
  async (config) => {
    if (!config.headers) {
      config.headers = {};
    }

    const token = localStorage.getItem(LS_TOKEN);

    if (!_.isNil(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
