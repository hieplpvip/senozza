import { baseApiSlice } from './base';
import { CommentDto } from '../../interface';

interface GetAllCommentsByPostArg {
  postId: string;
  sortBy: 'createdDate' | 'upvote';
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
    }),

    commentOnPost: builder.mutation<void, CommentOnPostArg>({
      query: ({ postId, body }) => ({
        url: '/post/comment/answer',
        method: 'POST',
        params: { postId },
        body,
      }),
    }),

    editComment: builder.mutation<void, EditCommentArg>({
      query: ({ postId, commentId, body }) => ({
        url: '/post/comment/edit',
        method: 'PUT',
        params: { postId, commentId },
        body,
      }),
    }),

    deleteComment: builder.mutation<void, DeleteCommentArg>({
      query: (params) => ({
        url: '/post/comment/delete',
        method: 'DELETE',
        params,
      }),
    }),

    voteComment: builder.mutation<void, VoteCommentArg>({
      query: (params) => ({
        url: '/post/comment/vote',
        method: 'PATCH',
        params,
      }),
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
