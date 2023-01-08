import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { CheckBadgeIcon, EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Spinner, useDisclosure } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { MacScrollbar } from 'mac-scrollbar';
import TimeAgo from 'react-timeago';

import CreateCommentModal from './CreateCommentModal';
import EditCommentModal from './EditCommentModal';
import { useGetAllCommentsByPostQuery, useDeleteCommentMutation } from '../../api';
import { useUserProfile, useIsInstructor } from '../../../app/hooks';
import AlertModal from '../../../components/AlertModal';
import { classNames } from '../../../utils';

export default function CommentBox({ postId }: { postId: string }) {
  const userProfile = useUserProfile();
  const isInstructor = useIsInstructor();
  const { data, isSuccess } = useGetAllCommentsByPostQuery({ postId, sortBy: 'createdDate' });

  const [targetId, setTargetId] = useState('');
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const [deleteComment] = useDeleteCommentMutation();

  const onDeleteComment = async () => {
    try {
      await deleteComment({ postId, commentId: targetId }).unwrap();
      onDeleteModalClose();
    } catch (err) {
      alert(`Failed to delete comment: ${err}`);
    }
  };

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
          onClick={onCreateModalOpen}
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
                                          onClick={() => {
                                            setTargetId(comment._id);
                                            onEditModalOpen();
                                          }}
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
                                        onClick={() => {
                                          setTargetId(comment._id);
                                          onDeleteModalOpen();
                                        }}
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

            {isCreateModalOpen && <CreateCommentModal isOpen={true} onClose={onCreateModalClose} postId={postId} />}
            {isEditModalOpen && (
              <EditCommentModal
                isOpen={true}
                onClose={onEditModalClose}
                postId={postId}
                commentId={targetId}
                content={data.find((c) => c._id === targetId)!.content}
              />
            )}
            {isDeleteModalOpen && (
              <AlertModal
                show={isDeleteModalOpen}
                onClose={onDeleteModalClose}
                onConfirm={onDeleteComment}
                title='Delete comment'
                body='Are you sure you want to delete this comment? This action cannot be undone.'
                confirmText='Delete comment'
                cancelText='Cancel'
              />
            )}
          </div>
        </MacScrollbar>
      )}
    </div>
  );
}
