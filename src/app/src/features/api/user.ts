import { baseApiSlice } from './base';
import { ClassDto, UserDto } from '../../interface';

interface editProfileRequest {
  firstName?: string;
  lastName?: string;
  birth?: string;
  imgUrl?: string;
}

export const userApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserDto, void>({
      query: () => ({
        url: '/user/info',
        method: 'GET',
      }),
      providesTags: [{ type: 'User', id: 'PROFILE' }],
    }),

    getJoinedClasses: builder.query<ClassDto[], void>({
      query: () => ({
        url: '/user/listClasses',
        method: 'GET',
      }),
      providesTags: [{ type: 'Class', id: 'LIST' }],
    }),

    editUserProfile: builder.mutation<UserDto, editProfileRequest>({
      query: (body) => ({
        url: '/user/update',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'PROFILE' }],
    }),
  }),
});

export const { useGetUserProfileQuery, useGetJoinedClassesQuery, useEditUserProfileMutation } = userApiSlice;
