import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TOKEN } from '@/config';

import { User } from '@/domain';

class AuthState {
  token: string | null = localStorage.getItem(TOKEN);
  user: User | null = null;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: new AuthState(),
  reducers: {
    setToken(state, { payload }: PayloadAction<string>) {
      localStorage.setItem(TOKEN, payload);
      state.token = payload;
    },
    setUser(state) {
      localStorage.setItem(TOKEN, payload);
      state.token = payload;
    },
  },
});
