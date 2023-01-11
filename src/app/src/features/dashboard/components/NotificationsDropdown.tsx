import { useEffect, useRef, useState, RefObject } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';

function useOnClickOutside(ref: RefObject<HTMLDivElement>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default function NotificationsDropdown() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <>
      <button
        className='group mb-5 flex w-full items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        onClick={() => setIsOpen(true)}>
        <BellIcon className='mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500' aria-hidden='true' />
        Notifications
      </button>
      <div
        ref={ref}
        className={
          'absolute left-64 top-10 z-20 w-80 overflow-hidden rounded-md border border-gray-400 bg-white shadow-lg' +
          (!isOpen ? ' hidden' : '')
        }>
        <div className='block border-b bg-gray-50 px-4 py-2 text-center font-medium text-gray-700'>Notifications</div>
        <div className='divide-y divide-gray-100'>
          <a href='#' className='flex px-4 py-3 hover:bg-gray-100 '>
            <img
              className='h-11 w-11 rounded-full'
              src='https://flowbite.com/docs/images/people/profile-picture-1.jpg'
            />
            <div className='w-full pl-3'>
              <div className='mb-1.5 text-sm text-gray-500 '>
                New message from <span className='font-semibold text-gray-900 '>Jese Leos</span>:
              </div>
              <div className='text-xs text-blue-600 '>a few moments ago</div>
            </div>
          </a>
          <a href='#' className='flex px-4 py-3 hover:bg-gray-100 '>
            <img
              className='h-11 w-11 rounded-full'
              src='https://flowbite.com/docs/images/people/profile-picture-1.jpg'
            />
            <div className='w-full pl-3'>
              <div className='mb-1.5 text-sm text-gray-500'>
                <span className='font-semibold text-gray-900'>Joseph Mcfall</span> and
                <span className='font-medium text-gray-900'>5 others</span> started following you.
              </div>
              <div className='text-xs text-blue-600'>10 minutes ago</div>
            </div>
          </a>
          <a href='#' className='flex px-4 py-3 hover:bg-gray-100'>
            <img
              className='h-11 w-11 rounded-full'
              src='https://flowbite.com/docs/images/people/profile-picture-1.jpg'
            />
            <div className='w-full pl-3'>
              <div className='mb-1.5 text-sm text-gray-500 '>
                <span className='font-semibold text-gray-900 '>Bonnie Green</span> and
                <span className='font-medium text-gray-900 '>141 others</span> love your story. See it and view more
                stories.
              </div>
              <div className='text-xs text-blue-600 '>44 minutes ago</div>
            </div>
          </a>
          <a href='#' className='flex px-4 py-3 hover:bg-gray-100 '>
            <img
              className='h-11 w-11 rounded-full'
              src='https://flowbite.com/docs/images/people/profile-picture-1.jpg'
            />
            <div className='w-full pl-3'>
              <div className='mb-1.5 text-sm text-gray-500 '>
                <span className='font-semibold text-gray-900'>Leslie Livingston</span> mentioned you in a comment:{' '}
                <span className='font-medium text-blue-500'>@bonnie.green</span> what do you say?
              </div>
              <div className='text-xs text-blue-600 '>1 hour ago</div>
            </div>
          </a>
          <a href='#' className='flex px-4 py-3 hover:bg-gray-100 '>
            <img
              className='h-11 w-11 rounded-full'
              src='https://flowbite.com/docs/images/people/profile-picture-1.jpg'
            />
            <div className='w-full pl-3'>
              <div className='mb-1.5 text-sm text-gray-500'>
                <span className='font-semibold text-gray-900'>Robert Brown</span> posted a new video: Glassmorphism -
                learn how to implement the new design trend.
              </div>
              <div className='text-xs text-blue-600'>3 hours ago</div>
            </div>
          </a>
        </div>
        <a
          href='#'
          className='block border-t bg-gray-50 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100'>
          <div className='inline-flex items-center '>
            <svg
              className='mr-2 h-4 w-4 text-gray-500'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M10 12a2 2 0 100-4 2 2 0 000 4z'></path>
              <path
                fillRule='evenodd'
                d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                clipRule='evenodd'></path>
            </svg>
            Mark all as read
          </div>
        </a>
      </div>
    </>
  );
}
