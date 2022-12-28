import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { AUTH_ACCESS_TOKEN_KEY } from '../../constants';

type AuthState = {
  accessToken: string | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, accessToken: null } as AuthState,
  reducers: {
    signOut: (state) => {
      localStorage.removeItem(AUTH_ACCESS_TOKEN_KEY);
      state.accessToken = null;
    },
    setAccessToken: (state, { payload }: PayloadAction<string>) => {
      localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, payload);
      state.accessToken = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(apiSlice.endpoints.signIn.matchFulfilled, (state, { payload }) => {
      localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, payload.accessToken);
      state.accessToken = payload.accessToken;
    });

    builder.addMatcher(apiSlice.endpoints.signUp.matchFulfilled, (state, { payload }) => {
      localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, payload.accessToken);
      state.accessToken = payload.accessToken;
    });
  },
});

export default slice.reducer;

export const { signOut, setAccessToken } = slice.actions;
