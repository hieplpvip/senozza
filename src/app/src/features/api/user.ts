import { baseApiSlice } from './base';
import { User } from '../../interface';

interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  birth: string;
  imgUrl: string;
}

export const userApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<User, void>({
      query: () => ({
        url: '/user/info',
        method: 'GET',
      }),
    }),

    getJoinedClasses: builder.query<void, void>({
      query: () => ({
        url: '/user/listClasses',
        method: 'GET',
      }),
    }),

    updateUserProfile: builder.mutation<User, UpdateProfileRequest>({
      query: (body) => ({
        url: `/user/update`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetUserProfileQuery, useGetJoinedClassesQuery, useUpdateUserProfileMutation } = userApiSlice;
