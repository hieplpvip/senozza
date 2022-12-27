import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { RootState } from '../../app/store';
import { User } from '../../interface';

type AuthState = {
  user: User | null;
  accessToken: string | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, accessToken: null } as AuthState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(apiSlice.endpoints.signIn.matchFulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    });

    builder.addMatcher(apiSlice.endpoints.signUp.matchFulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    });
  },
});

export default slice.reducer;

export const { signOut } = slice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
