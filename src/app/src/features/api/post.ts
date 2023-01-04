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
      providesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    getPostsByCategory: builder.query<PostDto[], GetPostsByCategoryArg>({
      query: (params) => ({
        url: '/post/filter',
        method: 'GET',
        params,
      }),
      providesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    getPostById: builder.query<PostDto, string>({
      query: (postId) => ({
        url: '/post/get',
        method: 'GET',
        params: { postId },
      }),
      providesTags: (_result, _error, arg) => [{ type: 'Post', id: arg }],
    }),

    createPost: builder.mutation<PostDto, CreatePostArg>({
      query: ({ classId, body }) => ({
        url: '/post/create',
        method: 'POST',
        params: { classId },
        body: { ...body, classId },
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    editPost: builder.mutation<void, EditPostArg>({
      query: ({ postId, body }) => ({
        url: '/post/edit',
        method: 'POST',
        params: { postId },
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Post', id: 'LIST' },
        { type: 'Post', id: arg.postId },
      ],
    }),

    deletePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/post/delete`,
        method: 'DELETE',
        params: { postId },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Post', id: 'LIST' },
        { type: 'Post', id: arg },
      ],
    }),

    pinPost: builder.mutation<void, string>({
      query: (postId) => ({
        url: '/post/edit',
        method: 'POST',
        params: { postId },
        body: { pin: true },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Post', id: 'LIST' },
        { type: 'Post', id: arg },
      ],
    }),

    unpinPost: builder.mutation<void, string>({
      query: (postId) => ({
        url: '/post/edit',
        method: 'POST',
        params: { postId },
        body: { pin: false },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Post', id: 'LIST' },
        { type: 'Post', id: arg },
      ],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostsByCategoryQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  usePinPostMutation,
  useUnpinPostMutation,
} = postApiSlice;
