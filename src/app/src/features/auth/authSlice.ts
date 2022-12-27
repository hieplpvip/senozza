import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { RootState } from '../../app/store';
import { AUTH_TOKEN_KEY } from '../../constants';
import { AuthResponse, User } from '../../interface';

type AuthState = {
  user: User | null;
  accessToken: string | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, accessToken: null } as AuthState,
  reducers: {
    signOut: (state) => {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      state.user = null;
      state.accessToken = null;
    },
    setUser: (state, { payload }: PayloadAction<AuthResponse>) => {
      localStorage.setItem(AUTH_TOKEN_KEY, payload.accessToken);
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(apiSlice.endpoints.signIn.matchFulfilled, (state, { payload }) => {
      localStorage.setItem(AUTH_TOKEN_KEY, payload.accessToken);
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    });

    builder.addMatcher(apiSlice.endpoints.signUp.matchFulfilled, (state, { payload }) => {
      localStorage.setItem(AUTH_TOKEN_KEY, payload.accessToken);
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    });
  },
});

export default slice.reducer;

export const { signOut, setUser } = slice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
