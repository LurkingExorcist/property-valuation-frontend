import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TOKEN } from '@/config';

import { User } from '@/domain';

type AuthState = {
  token: string | null;
  user: User | null;
};

const INITIAL_STATE: AuthState = {
  token: localStorage.getItem(TOKEN),
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
        localStorage.setItem(TOKEN, payload);
      } else {
        localStorage.removeItem(TOKEN);
      }

      state.token = payload;
    },
    setUser(state, { payload }: PayloadAction<User | null>) {
      state.user = payload;
    },
  },
});
