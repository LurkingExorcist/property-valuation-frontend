import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserEntity } from '@/domain';

import { LS_TOKEN } from '@/constants';

type AuthState = {
  token: string | null;
  user: UserEntity | null;
};

const INITIAL_STATE: AuthState = {
  token: localStorage.getItem(LS_TOKEN),
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    clear(state) {
      Object.assign(state, INITIAL_STATE);
    },
    setToken(state, { payload }: PayloadAction<string | null>) {
      if (payload) {
        localStorage.setItem(LS_TOKEN, payload);
      } else {
        localStorage.removeItem(LS_TOKEN);
      }

      state.token = payload;
    },
    setUser(state, { payload }: PayloadAction<UserEntity | null>) {
      state.user = payload;
    },
  },
});
