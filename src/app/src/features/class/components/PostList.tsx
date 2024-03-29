import { Select, Spinner, useDisclosure } from '@chakra-ui/react';
import { PlusSmallIcon } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { MacScrollbar } from 'mac-scrollbar';
import TimeAgo from 'react-timeago';

import CreatePostModal from './CreatePostModal';
import { useGetAllPostsQuery } from '../../api';
import { useAppSelector } from '../../../app/hooks';
import { classNames } from '../../../utils';

export default function PostList({
  postId: selectedPostId,
  setPostId,
}: {
  postId: string;
  setPostId: (postId: string) => void;
}) {
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const classId = useAppSelector((state) => state.class.selectedClassId);
  const { data = [], isSuccess } = useGetAllPostsQuery(classId);

  return (
    <>
      {isModalOpen && <CreatePostModal isOpen={true} onClose={onModalClose} />}
      <div className='relative flex h-full w-full flex-col border-gray-200 bg-gray-100'>
        <div className='flex-shrink-0'>
          <div className='flex h-16 flex-col justify-center bg-white px-4'>
            <div className='flex items-baseline space-x-3'>
              <h2 className='text-lg font-medium text-gray-900'>Feed</h2>
              <p className='text-sm font-medium text-gray-500'>{data.length} questions</p>
            </div>
          </div>
          <div className='flex items-center bg-white px-2 pb-2'>
            <Select rounded='3xl' defaultValue='all'>
              <option value='all'>All categories</option>
            </Select>
            <div>
              <button
                type='button'
                onClick={onModalOpen}
                className='ml-2 inline-flex items-center rounded-full bg-indigo-600 text-white shadow-sm hover:bg-indigo-700'>
                <PlusSmallIcon className='h-7 w-7' aria-hidden='true' />
              </button>
            </div>
          </div>
          <div className='border-t border-b border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-500'>
            Sorted by date
          </div>
        </div>
        <MacScrollbar as='nav' className='min-h-0 flex-1'>
          {!isSuccess ? (
            <div className='flex h-full items-center justify-center'>
              <Spinner size='xl' />
            </div>
          ) : (
            <ul role='list' className='divide-y divide-gray-200 border-b border-gray-200'>
              {data.map((post) => (
                <li
                  key={post._id}
                  className={classNames(
                    post.pin
                      ? post._id === selectedPostId
                        ? 'bg-indigo-200'
                        : 'bg-indigo-100 hover:bg-indigo-200'
                      : post._id === selectedPostId
                      ? 'bg-gray-200'
                      : 'bg-white hover:bg-gray-50',
                    'relative py-5 px-4',
                  )}>
                  {post.pin && (
                    <FontAwesomeIcon
                      icon={faThumbtack}
                      className='absolute top-2 left-2 h-4 w-4 text-indigo-400 group-hover:text-indigo-500'
                    />
                  )}
                  <div className='flex justify-between space-x-3'>
                    <img className='my-auto h-6 w-6 rounded-full' src={post.question.user.imgUrl} />
                    <div className='min-w-0 flex-1'>
                      <button className='block focus:outline-none' onClick={() => setPostId(post._id)}>
                        <span className='absolute inset-0' aria-hidden='true' />
                        <p className='truncate text-left text-sm font-medium text-gray-900'>{post.title}</p>
                        <p className='truncate text-left text-sm text-gray-500'>
                          by {post.question.user.firstName} {post.question.user.lastName}
                        </p>
                      </button>
                    </div>
                    <TimeAgo
                      date={new Date(post.question.createdDate)}
                      className='flex-shrink-0 whitespace-nowrap text-sm text-gray-500'
                    />
                  </div>
                  <div className='mt-1'>
                    <p className='line-clamp-2 text-sm text-gray-600'>{post.question.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </MacScrollbar>
      </div>
    </>
  );
}
