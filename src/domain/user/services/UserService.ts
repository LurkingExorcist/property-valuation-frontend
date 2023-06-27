import buildUrl from 'build-url-ts';
import * as _ from 'lodash';

import { URLS } from '@/constants';
import { requester } from '@/lib';
import { FindQuery, PaginatedData, Where } from '@/types';

import { UserEditForm, UserEntity } from '../types';

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

  static async loadUsers(query?: FindQuery<UserEntity>) {
    const data = await requester
      .get<PaginatedData<UserEntity>>(URLS.USERS, {
        params: query,
      })
      .then((res) => res.data);

    return data;
  }

  static async createUser(options: { form: UserEditForm }) {
    const data = await requester
      .post<UserEntity>(
        URLS.USERS,
        _.omit(
          {
            ...options.form,
            password:
              options.form.password !== '' ? options.form.password : undefined,
          },
          'passwordConfirmation'
        )
      )
      .then((res) => res.data);

    return data;
  }

  static async updateUser(options: { id: string; form: UserEditForm }) {
    const data = await requester
      .put<UserEntity>(
        buildUrl(URLS.USERS, { path: options.id }),
        _.omit(
          {
            ...options.form,
            password:
              options.form.password !== '' ? options.form.password : undefined,
          },
          'passwordConfirmation'
        )
      )
      .then((res) => res.data);

    return data;
  }

  static async batchRemove(query: Where<UserEntity>) {
    await requester.delete(URLS.USERS, {
      params: query,
    });
  }
}
