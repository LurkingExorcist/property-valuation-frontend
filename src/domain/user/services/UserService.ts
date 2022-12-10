import buildUrl from 'build-url-ts';

import { URLS } from '@/constants';
import { requester } from '@/lib';

import { UserEntity } from '../types';

export class UserService {
  static async signin(payload: { username: string; password: string }) {
    const data = await requester
      .post<{ token: string }>(
        buildUrl(URLS.AUTHENTICATION, {
          path: 'signin',
        }),
        payload
      )
      .then((res) => res.data);

    return data;
  }

  static async loadUser() {
    const data = await requester
      .get<UserEntity>(
        buildUrl(URLS.AUTHENTICATION, {
          path: 'me',
        })
      )
      .then((res) => res.data);

    return data;
  }
}
