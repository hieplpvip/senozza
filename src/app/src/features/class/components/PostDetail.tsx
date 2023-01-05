import { PencilIcon } from '@heroicons/react/24/solid';
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid';
import { Spinner, useDisclosure } from '@chakra-ui/react';
import { MacScrollbar } from 'mac-scrollbar';

import CreateCommentModal from './CreateCommentModal';
import EditPostModal from './EditPostModal';
import { useGetAllCommentsByPostQuery, useGetPostByIdQuery } from '../../api';
import { useUserProfile } from '../../../app/hooks';
import { MarkdownPreview } from '../../../components/Markdown';
import { CommentDto } from '../../../interface';

function Comment({ comment }: { comment: CommentDto }) {
  return (
    <div className='mx-auto mt-3 w-full flex-col border-b-2 border-r-2 border-gray-200 bg-white p-4 sm:rounded-lg sm:shadow-sm'>
      <div className='flex flex-row'>
        <div className='flex flex-col justify-center'>
          <button>
            <ChevronDoubleUpIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
            <span className='text-gray-500'>{comment.vote}</span>
          </button>
        </div>
        <div className='flex-col'>
          <div className='flex flex-1 items-center font-bold leading-tight'>
            <img className='mx-2 h-9 w-9 rounded-full border-2 border-gray-300' src={comment.user.imgUrl} />
            {comment.user.firstName} {comment.user.lastName}
            <span className='ml-1 text-xs font-normal text-gray-500'>answered 3 days ago</span>
          </div>
          <div className='flex-1 px-2 text-sm font-medium leading-loose text-gray-600'>{comment.content}</div>
        </div>
      </div>
    </div>
  );
}

function CommentBox({ postId }: { postId: string }) {
  const { data, isSuccess } = useGetAllCommentsByPostQuery({ postId, sortBy: 'createdDate' });
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

  return (
    <div className='flex h-full w-full flex-col bg-white'>
      <div className='mx-3 flex items-center border-b border-gray-200'>
        <nav className='-mb-px flex flex-1 space-x-6 xl:space-x-8' aria-label='Tabs'>
          <span className='whitespace-nowrap border-b-2 border-indigo-500 py-4 px-1 text-sm font-medium text-indigo-600'>
            Answers
          </span>
        </nav>
        <button
          type='button'
          onClick={onModalOpen}
          className='inline-flex items-center rounded-lg border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700'>
          Answer this question
        </button>
      </div>

      {!isSuccess && (
        <div className='flex h-full items-center justify-center'>
          <Spinner size='lg' />
        </div>
      )}

      {isSuccess && (
        <MacScrollbar as='section' className='min-h-0 flex-1'>
          <div className='container mx-auto px-0 sm:px-5'>
            {data.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        </MacScrollbar>
      )}

      {isModalOpen && <CreateCommentModal isOpen={true} onClose={onModalClose} postId={postId} />}
    </div>
  );
}

export default function PostDetail({ postId }: { postId: string }) {
  const userProfile = useUserProfile();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { data: post, isSuccess } = useGetPostByIdQuery(postId, { skip: !postId });

  if (postId === '') {
    return <></>;
  }

  if (!isSuccess) {
    return (
      <div className='row-span-2 flex h-full items-center justify-center'>
        <Spinner size='xl' />
      </div>
    );
  }

  return (
    <>
      {isModalOpen && (
        <EditPostModal
          isOpen={true}
          onClose={onModalClose}
          postId={postId}
          title={post.title}
          content={post.question.content}
        />
      )}
      <div className='flex flex-col py-4 px-4'>
        <div className='mb-4 flex items-center justify-between space-x-4 pb-2 '>
          <div>
            <div className='flex flex-1 items-center font-bold leading-tight'>
              <img className='mr-2 h-7 w-7 rounded-full border-2 border-gray-300' src={post.question.user.imgUrl} />
              {post.question.user.firstName} {post.question.user.lastName}
              <span className='ml-1 text-xs font-normal text-gray-500'>asked 3 days ago</span>
            </div>
            <div className='flex flex-row'>
              <h1 className='text-2xl font-bold text-gray-900'>{post.title}</h1>
              {/* <div className='ml-2 flex flex-col justify-center'>
                <span className='text-sm text-gray-500'>#1111</span>
              </div> */}
            </div>
          </div>
          {post.question.user._id === userProfile._id && (
            <div className='flex space-x-3'>
              <button
                type='button'
                onClick={onModalOpen}
                className='inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50'>
                <PencilIcon className='-ml-1 mr-2 h-5 w-5 text-gray-400' aria-hidden='true' />
                <span>Edit</span>
              </button>
            </div>
          )}
        </div>

        <MarkdownPreview source={post.question.content} />
      </div>
      <div>
        <CommentBox postId={postId} />
      </div>
    </>
  );
}
