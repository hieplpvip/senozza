import { baseApiSlice } from './base';
import { UserDto, UserRole } from '../../interface';

interface SignInArg {
  email: string;
  password: string;
}

interface SignUpArg {
  email: string;
  firstName: string;
  lastName: string;
  birth: string;
  role: UserRole;
  imgUrl: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  user: UserDto;
}

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, SignInArg>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    signUp: builder.mutation<AuthResponse, SignUpArg>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApiSlice;
