import buildUrl from 'build-url-ts';

import { api, URLS } from '@/api';

import { User } from './User';

export class UserService {
  static async signin(query: { username: string; password: string }) {
    const data = await api
      .post<{ token: string }>(
        buildUrl(URLS.AUTHENTICATION, {
          path: 'signin',
        }),
        query
      )
      .then((res) => res.data);

    return data;
  }

  static async loadUser() {
    const data = await api
      .get<User>(
        buildUrl(URLS.AUTHENTICATION, {
          path: 'me',
        })
      )
      .then((res) => res.data);

    return data;
  }
}
