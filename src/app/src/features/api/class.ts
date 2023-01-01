import { baseApiSlice } from './base';
import { ClassDto, UserDto } from '../../interface';

interface CreateClassArg {
  courseCode: string;
  courseName: string;
  year: number;
  semester: number;
  categories: string[];
}

interface EditClassArg {
  classId: string;
  body: {
    courseCode?: string;
    courseName?: string;
    year?: number;
    semester?: number;
    categories?: string[];
    archived?: boolean;
  };
}

interface InviteToClassByEmailsArg {
  classId: string;
  emails: string[];
}

export const classApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJoinedClasses: builder.query<ClassDto[], void>({
      query: () => ({
        url: '/user/listClasses',
        method: 'GET',
      }),
      providesTags: [{ type: 'Class', id: 'LIST' }],
    }),

    getClassById: builder.query<ClassDto, string>({
      query: (classId) => ({
        url: '/class/find',
        method: 'GET',
        params: { classId },
      }),
      providesTags: (_result, _error, arg) => [{ type: 'Class', id: arg }],
    }),

    getStudentsInClass: builder.query<UserDto[], string>({
      query: (classId) => ({
        url: '/class/listStudent',
        method: 'GET',
        params: { classId },
      }),
    }),

    createClass: builder.mutation<ClassDto, CreateClassArg>({
      query: (body) => ({
        url: '/class/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Class', id: 'LIST' }],
    }),

    editClass: builder.mutation<ClassDto, EditClassArg>({
      query: ({ classId, body }) => ({
        url: '/class/update',
        method: 'PUT',
        params: { classId },
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Class', id: 'LIST' },
        { type: 'Class', id: arg.classId },
      ],
    }),

    deleteClass: builder.mutation<void, string>({
      query: (classId) => ({
        url: '/class/delete',
        method: 'DELETE',
        params: { classId },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Class', id: 'LIST' },
        { type: 'Class', id: arg },
      ],
    }),

    inviteToClassByEmails: builder.mutation<void, InviteToClassByEmailsArg>({
      query: ({ classId, emails }) => ({
        url: '/class/invite',
        method: 'PUT',
        body: emails,
        params: { classId },
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Class', id: arg.classId }],
    }),

    joinClassByCode: builder.mutation<void, string>({
      query: (code) => ({
        url: '/class/join',
        method: 'PUT',
        params: { code },
      }),
      invalidatesTags: [{ type: 'Class', id: 'LIST' }],
    }),

    leaveClass: builder.mutation<void, string>({
      query: (classId) => ({
        url: '/class/leave',
        method: 'PUT',
        params: { classId },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Class', id: 'LIST' },
        { type: 'Class', id: arg },
      ],
    }),
  }),
});

export const {
  useGetJoinedClassesQuery,
  useGetClassByIdQuery,
  useGetStudentsInClassQuery,
  useCreateClassMutation,
  useEditClassMutation,
  useDeleteClassMutation,
  useInviteToClassByEmailsMutation,
  useJoinClassByCodeMutation,
  useLeaveClassMutation,
} = classApiSlice;
