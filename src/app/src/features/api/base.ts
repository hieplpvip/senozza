import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { signOut } from '../auth/authSlice';
import { RootState } from '../../app/store';
import { AUTH_ACCESS_TOKEN_KEY } from '../../constants';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.accessToken || localStorage.getItem(AUTH_ACCESS_TOKEN_KEY);
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithSignOut: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(signOut());
  }
  return result;
};

export const baseApiSlice = createApi({
  baseQuery: baseQueryWithSignOut,
  endpoints: () => ({}),
});
