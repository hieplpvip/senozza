import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  CheckBadgeIcon,
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { Spinner, useDisclosure } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { MacScrollbar } from 'mac-scrollbar';
import TimeAgo from 'react-timeago';

import CreateCommentModal from './CreateCommentModal';
import EditPostModal from './EditPostModal';
import {
  useDeletePostMutation,
  useGetAllCommentsByPostQuery,
  useGetPostByIdQuery,
  usePinPostMutation,
} from '../../api';
import { useUserProfile, useIsInstructor } from '../../../app/hooks';
import AlertModal from '../../../components/AlertModal';
import { MarkdownPreview } from '../../../components/Markdown';
import { classNames } from '../../../utils';

function CommentBox({ postId }: { postId: string }) {
  const userProfile = useUserProfile();
  const isInstructor = useIsInstructor();
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
            {data.map((comment) => {
              const isAuthor = comment.user._id === userProfile._id;

              return (
                <div
                  className='mx-auto mt-3 w-full flex-col border-b-2 border-r-2 border-gray-200 bg-white p-4 sm:rounded-lg sm:shadow-sm'
                  key={comment._id}>
                  <div className='flex flex-row'>
                    <div className='flex flex-col justify-center'>
                      <button className='-mb-3'>
                        <FontAwesomeIcon icon={faChevronUp} className='h-5 w-5 text-gray-500' />
                      </button>
                      <span className='text-center text-gray-500'>{comment.vote}</span>
                      <button className='voted -mt-1'>
                        <FontAwesomeIcon icon={faChevronDown} className='h-5 w-5 text-indigo-500' />
                      </button>
                    </div>
                    <div className='grow flex-col'>
                      <div className='flex items-center justify-between leading-tight'>
                        <div className='flex items-center'>
                          <img
                            className='mx-2 h-9 w-9 rounded-full border-2 border-gray-300'
                            src={comment.user.imgUrl}
                          />
                          <span className='font-bold'>
                            {comment.user.firstName} {comment.user.lastName}
                          </span>
                          <span className='ml-1 font-normal text-gray-500'>
                            answered <TimeAgo date={new Date(comment.createdDate)} />
                          </span>
                        </div>
                        {(isInstructor || isAuthor) && (
                          <Menu as='div' className='relative inline-block text-left'>
                            <Menu.Button className='inline-flex w-full justify-center bg-white p-1 text-sm font-medium text-gray-700'>
                              <EllipsisHorizontalIcon className='h-5 w-5' aria-hidden='true' />
                            </Menu.Button>

                            <Transition
                              as={Fragment}
                              enter='transition ease-out duration-100'
                              enterFrom='transform opacity-0 scale-95'
                              enterTo='transform opacity-100 scale-100'
                              leave='transition ease-in duration-75'
                              leaveFrom='transform opacity-100 scale-100'
                              leaveTo='transform opacity-0 scale-95'>
                              <Menu.Items className='absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                <div className='py-1'>
                                  {isInstructor && (
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          onClick={onModalOpen}
                                          className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'group flex w-full items-center px-4 py-2 text-sm',
                                          )}>
                                          <CheckBadgeIcon
                                            className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                            aria-hidden='true'
                                          />
                                          Mark as correct
                                        </button>
                                      )}
                                    </Menu.Item>
                                  )}{' '}
                                  {isAuthor && (
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          onClick={onModalOpen}
                                          className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'group flex w-full items-center px-4 py-2 text-sm',
                                          )}>
                                          <PencilSquareIcon
                                            className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                            aria-hidden='true'
                                          />
                                          Edit
                                        </button>
                                      )}
                                    </Menu.Item>
                                  )}
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'group flex w-full items-center px-4 py-2 text-sm',
                                        )}>
                                        <TrashIcon
                                          className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                          aria-hidden='true'
                                        />
                                        Delete
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        )}
                      </div>
                      <div className='flex-1 px-2 text-sm font-normal leading-loose text-gray-600'>
                        {comment.content}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </MacScrollbar>
      )}

      {isModalOpen && <CreateCommentModal isOpen={true} onClose={onModalClose} postId={postId} />}
    </div>
  );
}

export default function PostDetail({ postId }: { postId: string }) {
  const userProfile = useUserProfile();
  const isInstructor = useIsInstructor();
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const { data: post, isError, isFetching, isSuccess } = useGetPostByIdQuery(postId, { skip: !postId });
  const [pinPost] = usePinPostMutation();
  const [deletePost] = useDeletePostMutation();

  if (postId === '') {
    return <></>;
  }

  if (isError) {
    return <></>;
  }

  if (isFetching || !isSuccess) {
    return (
      <div className='row-span-2 flex h-full items-center justify-center'>
        <Spinner size='xl' />
      </div>
    );
  }

  const isAuthor = post.question.user._id === userProfile._id;

  const handlePin = async () => {
    try {
      await pinPost({ postId: post._id, pin: !post.pin }).unwrap();
    } catch (err) {
      alert(`Failed to ${post.pin ? 'unpin' : 'pin'} post: ${err}`);
    }
  };

  const onDeletePost = async () => {
    try {
      await deletePost(post._id).unwrap();
      onDeleteModalClose();
    } catch (err) {
      alert(`Failed to delete post: ${err}`);
    }
  };

  return (
    <>
      {isEditModalOpen && (
        <EditPostModal
          isOpen={true}
          onClose={onEditModalClose}
          postId={postId}
          title={post.title}
          content={post.question.content}
        />
      )}
      {isDeleteModalOpen && (
        <AlertModal
          show={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          onConfirm={onDeletePost}
          title='Delete post'
          body='Are you sure you want to delete this post? This action cannot be undone.'
          confirmText='Delete post'
          cancelText='Cancel'
        />
      )}
      <div className='flex flex-col py-4 px-4'>
        <div className='mb-4 flex items-center justify-between space-x-4 pb-2'>
          <div>
            <div className='flex flex-1 items-center font-bold leading-tight'>
              <img className='mr-2 h-7 w-7 rounded-full border-2 border-gray-300' src={post.question.user.imgUrl} />
              {post.question.user.firstName} {post.question.user.lastName}
              <span className='ml-1 font-normal text-gray-500'>
                asked <TimeAgo date={new Date(post.question.createdDate)} />
              </span>
            </div>
            <div className='flex flex-row'>
              <h1 className='text-2xl font-bold text-gray-900'>{post.title}</h1>
              {/* <div className='ml-2 flex flex-col justify-center'>
                <span className='text-sm text-gray-500'>#1111</span>
              </div> */}
            </div>
          </div>
          {(isInstructor || isAuthor) && (
            <Menu as='div' className='relative inline-block text-left'>
              <Menu.Button className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50'>
                Options
                <ChevronDownIcon className='-mr-1 ml-2 h-5 w-5' aria-hidden='true' />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'>
                <Menu.Items className='absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  {isInstructor && (
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handlePin}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'group flex w-full items-center px-4 py-2 text-sm',
                            )}>
                            <FontAwesomeIcon
                              icon={faThumbtack}
                              className='-mb-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                            />
                            {post.pin ? 'Unpin' : 'Pin to top'}
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  )}
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={onEditModalOpen}
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'group flex w-full items-center px-4 py-2 text-sm',
                          )}>
                          <PencilSquareIcon
                            className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                            aria-hidden='true'
                          />
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={onDeleteModalOpen}
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'group flex w-full items-center px-4 py-2 text-sm',
                          )}>
                          <TrashIcon
                            className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                            aria-hidden='true'
                          />
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
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
