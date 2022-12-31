import { Fragment } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Spinner, useDisclosure } from '@chakra-ui/react';
import { Listbox, Transition } from '@headlessui/react';
import {
  ArrowLeftOnRectangleIcon,
  ChatBubbleLeftEllipsisIcon,
  BellIcon,
  CogIcon,
  UserGroupIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { MacScrollbar } from 'mac-scrollbar';

import CreateClassModal from './components/CreateClassModal';
import JoinClassModal from './components/JoinClassModal';

import { useGetClassQuery, useGetJoinedClassesQuery, useGetUserProfileQuery } from '../api';
import { signOut } from '../auth/authSlice';
import { setSelectedClassId } from '../class/classSlide';
import { useAppDispatch, useAppSelector, useUserProfile } from '../../app/hooks';
import { classNames } from '../../utils';

const navigation = [
  { name: 'Notifications', to: 'notifications', icon: BellIcon },
  { name: 'Chatroom', to: 'chat', icon: ChatBubbleLeftEllipsisIcon },
  { name: 'Class Feed', to: 'feed', icon: UserGroupIcon },
];

function ClassSelector() {
  const userProfile = useUserProfile();
  const dispatch = useAppDispatch();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

  const selectedClassId = useAppSelector((state) => state.class.selectedClassId);
  const { data: joinedClasses } = useGetJoinedClassesQuery();
  const { data: selectedClass, isSuccess: hasClassData } = useGetClassQuery(selectedClassId || '', {
    skip: !selectedClassId,
  });

  const handleSelect = (classId: string) => {
    dispatch(setSelectedClassId(classId));
  };

  return (
    <>
      {userProfile.role === 'instructor' ? (
        <CreateClassModal isOpen={isModalOpen} onClose={onModalClose} />
      ) : (
        <JoinClassModal isOpen={isModalOpen} onClose={onModalClose} />
      )}
      <Listbox value={selectedClassId || ''} onChange={handleSelect}>
        {({ open }) => (
          <>
            <div className='relative mt-1'>
              <Listbox.Button className='relative w-full cursor-default border border-gray-300 bg-white py-2 pl-3 pr-10 text-left focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'>
                <span className='flex items-center'>
                  {!selectedClassId ? (
                    <span className='mx-auto block italic text-gray-400'>No class selected</span>
                  ) : !hasClassData ? (
                    <span className='mx-auto block italic text-gray-400'>Loading</span>
                  ) : (
                    <>
                      <img
                        src={'https://ui-avatars.com/api/?background=random&name=' + selectedClass.courseName}
                        className='h-6 w-6 flex-shrink-0 rounded-full'
                      />
                      <span className='ml-3 block truncate'>{selectedClass.courseName}</span>
                    </>
                  )}
                </span>
                <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                  <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                  <Listbox.Option key={-1} value=''>
                    <div className='p-2'>
                      <button
                        type='button'
                        className='mx-auto w-full rounded-full border border-gray-300 p-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        onClick={onModalOpen}>
                        <span className='text-sm font-medium text-gray-500'>
                          <PlusIcon className='-mt-[0.22rem] mr-1 inline-block h-5 w-5' aria-hidden='true' />
                          {userProfile.role === 'instructor' ? 'Create new class' : 'Join class'}
                        </span>
                      </button>
                    </div>
                  </Listbox.Option>

                  {joinedClasses &&
                    joinedClasses.map((c) => (
                      <Listbox.Option
                        key={c._id}
                        value={c._id}
                        className={({ active }) =>
                          classNames(
                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-3 pr-9',
                          )
                        }>
                        {({ selected, active }) => (
                          <>
                            <div className='flex items-center'>
                              <img
                                src={'https://ui-avatars.com/api/?background=random&name=' + c.courseName}
                                className='h-6 w-6 flex-shrink-0 rounded-full'
                              />
                              <span
                                className={classNames(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'ml-3 block truncate',
                                )}>
                                {c.courseCode} - {c.courseName}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                )}>
                                <CheckIcon className='h-5 w-5' aria-hidden='true' />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
  );
}

function NavigationLink(item: { name: string; to: string; icon: typeof BellIcon }) {
  const location = useLocation();
  const current = location.pathname.endsWith(item.to);

  return (
    <Link
      key={item.name}
      to={item.to}
      className={classNames(
        current ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        'group flex items-center px-3 py-2 text-sm font-medium',
      )}>
      <item.icon
        className={classNames(current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 h-6 w-6')}
        aria-hidden='true'
      />
      {item.name}
    </Link>
  );
}

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { data: user, isLoading, isSuccess } = useGetUserProfileQuery();

  if (isLoading || !isSuccess) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Spinner size='xl' />
      </div>
    );
  }

  return (
    <>
      <div className='flex h-full'>
        <div className='flex flex-shrink-0 border-r-2 border-gray-200'>
          <div className='flex w-64 flex-col'>
            <div className='flex min-h-0 flex-1 flex-col border-gray-200 bg-gray-100'>
              <div className='flex flex-shrink-0 items-center px-5 pt-4'>
                <img className='h-8 w-auto' src={process.env.PUBLIC_URL + '/logo-with-name.svg'} alt='Senozza' />
              </div>
              <MacScrollbar className='flex flex-1 flex-col py-4'>
                <nav className='flex-1' aria-label='Sidebar'>
                  <ClassSelector />
                  <div className='space-y-1'>
                    {navigation.map((item) => (
                      <NavigationLink key={item.name} {...item} />
                    ))}
                    <NavigationLink name='Settings' to='settings' icon={CogIcon} />
                  </div>
                </nav>
              </MacScrollbar>
              <div className='block w-full flex-shrink-0'>
                <button
                  key='signOut'
                  className='group flex w-full items-center py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  onClick={() => dispatch(signOut())}>
                  <ArrowLeftOnRectangleIcon
                    className='mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                  Sign Out
                </button>
              </div>
              <div className='flex flex-shrink-0 border-t border-gray-200 p-4'>
                <a href='#' className='group block w-full flex-shrink-0'>
                  <div className='flex items-center'>
                    <div>
                      <img className='inline-block h-9 w-9 rounded-full' src={user.imgUrl} />
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                        {user.firstName} {user.lastName}
                      </p>
                      <p className='text-xs font-medium text-gray-500 group-hover:text-gray-700'>View profile</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
}
