import { baseApiSlice } from './base';
import { ClassDto } from '../../interface';

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
    createClass: builder.mutation<ClassDto, CreateClassArg>({
      query: (body) => ({
        url: '/class/create',
        method: 'POST',
        body,
      }),
    }),

    editClass: builder.mutation<ClassDto, EditClassArg>({
      query: ({ classId, body }) => ({
        url: '/class/update',
        method: 'PUT',
        params: { classId },
        body,
      }),
    }),

    deleteClass: builder.mutation<void, string>({
      query: (classId) => ({
        url: '/class/delete',
        method: 'DELETE',
        params: { classId },
      }),
    }),

    inviteToClassByEmails: builder.mutation<void, InviteToClassByEmailsArg>({
      query: ({ classId, emails }) => ({
        url: '/class/invite',
        method: 'PUT',
        body: emails,
        params: { classId },
      }),
    }),

    joinClassByCode: builder.mutation<void, string>({
      query: (code) => ({
        url: '/class/join',
        method: 'PUT',
        params: { code },
      }),
    }),

    leaveClass: builder.mutation<void, string>({
      query: (classId) => ({
        url: '/class/leave',
        method: 'PUT',
        params: { classId },
      }),
    }),
  }),
});

export const {
  useCreateClassMutation,
  useEditClassMutation,
  useDeleteClassMutation,
  useInviteToClassByEmailsMutation,
  useJoinClassByCodeMutation,
  useLeaveClassMutation,
} = classApiSlice;
