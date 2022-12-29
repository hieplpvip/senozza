import { baseApiSlice } from './base';
import { PostDto } from '../../interface';

interface GetPostsByCategoryArg {
  classId: string;
  category: string;
}

interface CreatePostArg {
  classId: string;
  body: {
    title: string;
    category: string;
    classId: object;
    question: {
      createdDate: string;
      content: string;
    };
  };
}

interface EditPostArg {
  postId: string;
  body: {
    title?: string;
    category?: string;
    pin?: boolean;
    question: { content?: string };
  };
}

export const postApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<PostDto[], string>({
      query: (classId) => ({
        url: '/post/all',
        method: 'GET',
        params: { classId },
      }),
    }),

    getPostsByCategory: builder.query<PostDto[], GetPostsByCategoryArg>({
      query: (params) => ({
        url: '/post/filter',
        method: 'GET',
        params,
      }),
    }),

    createPost: builder.mutation<PostDto, CreatePostArg>({
      query: ({ classId, body }) => ({
        url: '/post/create',
        method: 'POST',
        params: { classId },
        body,
      }),
    }),

    editPost: builder.mutation<void, EditPostArg>({
      query: ({ postId, body }) => ({
        url: '/post/edit',
        method: 'POST',
        params: { postId },
        body,
      }),
    }),

    deletePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/post/delete`,
        method: 'DELETE',
        params: { postId },
      }),
    }),

    pinPost: builder.mutation<void, string>({
      query: (postId) => ({
        url: '/post/edit',
        method: 'POST',
        params: { postId },
        body: { pin: true },
      }),
    }),

    unpinPost: builder.mutation<void, string>({
      query: (postId) => ({
        url: '/post/edit',
        method: 'POST',
        params: { postId },
        body: { pin: false },
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostsByCategoryQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  usePinPostMutation,
  useUnpinPostMutation,
} = postApiSlice;
