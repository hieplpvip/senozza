import { baseApiSlice } from './base';

export const classApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createClass: builder.mutation<void, void>({
      query: () => ({
        url: `/class/create`,
        method: 'POST',
      }),
    }),

    updateClass: builder.mutation<void, void>({
      query: () => ({
        url: `/class/update`,
        method: 'PUT',
      }),
    }),

    deleteClass: builder.mutation<void, string>({
      query: (classId) => ({
        url: `/class/delete`,
        method: 'DELETE',
        params: { classId },
      }),
    }),

    inviteToClassByMails: builder.mutation<
      void,
      {
        classId: string;
        emails: string[];
      }
    >({
      query: ({ classId, emails }) => ({
        url: `/class/invite`,
        method: 'PUT',
        body: emails,
        params: { classId },
      }),
    }),

    joinClassByCode: builder.mutation<void, string>({
      query: (code) => ({
        url: `/class/join`,
        method: 'PUT',
        params: { code },
      }),
    }),

    leaveClass: builder.mutation<void, string>({
      query: (classId) => ({
        url: `/class/leave`,
        method: 'PUT',
        params: { classId },
      }),
    }),
  }),
});

export const {
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
  useJoinClassByCodeMutation,
  useLeaveClassMutation,
} = classApiSlice;
