import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Spinner, useDisclosure } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import TimeAgo from 'react-timeago';

import CommentBox from './CommentBox';
import EditPostModal from './EditPostModal';

import { useDeletePostMutation, useGetPostByIdQuery, usePinPostMutation } from '../../api';
import { useUserProfile, useIsInstructor } from '../../../app/hooks';
import AlertModal from '../../../components/AlertModal';
import { MarkdownPreview } from '../../../components/Markdown';
import { classNames } from '../../../utils';

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
