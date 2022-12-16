import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { RootState } from '../../app/store';
import { User } from '../../interface';

type AuthState = {
  user: User | null;
  token: string | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(apiSlice.endpoints.signIn.matchFulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
    });

    builder.addMatcher(apiSlice.endpoints.signUp.matchFulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
    });
  },
});

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
