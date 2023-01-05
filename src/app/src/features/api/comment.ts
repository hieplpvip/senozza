import { baseApiSlice } from './base';
import { CommentDto } from '../../interface';

interface GetAllCommentsByPostArg {
  postId: string;
  sortBy: 'createdDate' | 'vote';
}

interface CommentOnPostArg {
  postId: string;
  body: {
    createdDate: string;
    content: string;
  };
}

interface EditCommentArg {
  postId: string;
  commentId: string;
  body: {
    content?: string;
  };
}

interface DeleteCommentArg {
  postId: string;
  commentId: string;
}

interface VoteCommentArg {
  postId: string;
  commentId: string;
  upvote: number;
}

export const commentApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCommentsByPost: builder.query<CommentDto[], GetAllCommentsByPostArg>({
      query: (params) => ({
        url: '/post/comment/all',
        method: 'GET',
        params,
      }),
      providesTags: (_result, _error, arg) => [{ type: 'Comment', id: arg.postId }],
    }),

    commentOnPost: builder.mutation<void, CommentOnPostArg>({
      query: ({ postId, body }) => ({
        url: '/post/comment/answer',
        method: 'POST',
        params: { postId },
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Comment', id: arg.postId }],
    }),

    editComment: builder.mutation<void, EditCommentArg>({
      query: ({ postId, commentId, body }) => ({
        url: '/post/comment/edit',
        method: 'PUT',
        params: { postId, commentId },
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Comment', id: arg.postId }],
    }),

    deleteComment: builder.mutation<void, DeleteCommentArg>({
      query: (params) => ({
        url: '/post/comment/delete',
        method: 'DELETE',
        params,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Comment', id: arg.postId }],
    }),

    voteComment: builder.mutation<void, VoteCommentArg>({
      query: (params) => ({
        url: '/post/comment/vote',
        method: 'PATCH',
        params,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Comment', id: arg.postId }],
    }),
  }),
});

export const {
  useGetAllCommentsByPostQuery,
  useCommentOnPostMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useVoteCommentMutation,
} = commentApiSlice;
