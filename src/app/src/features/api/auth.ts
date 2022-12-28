import { baseApiSlice } from './base';
import { User, UserRole } from '../../interface';

interface SignUpRequest {
  email: string;
  firstName: string;
  lastName: string;
  birth: string;
  role: UserRole;
  imgUrl: string;
  password: string;
}

interface SignInRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  user: User;
}

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, SignInRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    signUp: builder.mutation<AuthResponse, SignUpRequest>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApiSlice;
