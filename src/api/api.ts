import axios from 'axios';
import * as _ from 'lodash';

import { API_URL, TOKEN } from '@/config';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Headers': 'content-type, Authorization',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    if (!config.headers) {
      config.headers = {};
    }

    const token = localStorage.getItem(TOKEN);

    if (!_.isNil(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
