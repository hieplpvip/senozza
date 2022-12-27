import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { AUTH_TOKEN_KEY } from '../../constants';
import { AuthResponse, SignInRequest, SignUpRequest, User } from '../../interface';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.accessToken || localStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, SignInRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation<AuthResponse, SignUpRequest>({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserDetails: builder.query<User, void>({
      query: () => ({
        url: 'user/info',
        method: 'GET',
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useGetUserDetailsQuery } = apiSlice;
