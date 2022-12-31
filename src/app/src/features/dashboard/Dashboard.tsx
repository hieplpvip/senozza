import { Fragment } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Spinner, useDisclosure } from '@chakra-ui/react';
import { Listbox, Transition } from '@headlessui/react';
import {
  AcademicCapIcon,
  ArrowLeftOnRectangleIcon,
  BellIcon,
  CogIcon,
  PlusIcon,
  InboxStackIcon,
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

function ClassSelector({
  isClassModalOpen,
  onClassModalOpen,
  onClassModalClose,
}: {
  isClassModalOpen: boolean;
  onClassModalOpen: () => void;
  onClassModalClose: () => void;
}) {
  const userProfile = useUserProfile();
  const dispatch = useAppDispatch();

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
        <CreateClassModal isOpen={isClassModalOpen} onClose={onClassModalClose} />
      ) : (
        <JoinClassModal isOpen={isClassModalOpen} onClose={onClassModalClose} />
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
                        onClick={onClassModalOpen}>
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

function NavigationLink(item: {
  name: string;
  to: string;
  icon: typeof InboxStackIcon;
  classNames?: string;
  disabled?: boolean;
}) {
  const location = useLocation();
  const current = location.pathname.endsWith(item.to);

  return (
    <Link
      key={item.name}
      to={item.to}
      className={classNames(
        item.classNames || '',
        current
          ? 'bg-gray-200 text-gray-900'
          : (item.disabled ? 'pointer-events-none text-gray-400' : 'text-gray-600') +
              ' hover:bg-gray-50 hover:text-gray-900',
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
  const location = useLocation();
  const dispatch = useAppDispatch();
  const selectedClassId = useAppSelector((state) => state.class.selectedClassId);
  const { data: joinedClasses } = useGetJoinedClassesQuery();
  const { data: userProfile, isLoading, isSuccess } = useGetUserProfileQuery();
  const { isOpen: isClassModalOpen, onOpen: onClassModalOpen, onClose: onClassModalClose } = useDisclosure();

  if (isLoading || !isSuccess) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Spinner size='xl' />
      </div>
    );
  }

  const isCurrentPageDashboard = location.pathname === '/dashboard';

  if (isCurrentPageDashboard && selectedClassId) {
    return <Navigate to='/dashboard/feed' replace />;
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
                  <NavigationLink name='Notifications' to='#' icon={BellIcon} classNames='mb-10' />
                  <ClassSelector
                    isClassModalOpen={isClassModalOpen}
                    onClassModalOpen={onClassModalOpen}
                    onClassModalClose={onClassModalClose}
                  />
                  <div className='space-y-1'>
                    <NavigationLink name='Class Feed' to='feed' icon={InboxStackIcon} disabled={!selectedClassId} />
                    <NavigationLink name='Settings' to='settings' icon={CogIcon} disabled={!selectedClassId} />
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
                      <img className='inline-block h-9 w-9 rounded-full' src={userProfile.imgUrl} />
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                        {userProfile.firstName} {userProfile.lastName}
                      </p>
                      <p className='text-xs font-medium text-gray-500 group-hover:text-gray-700'>View profile</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {isCurrentPageDashboard && !selectedClassId ? (
          <div className='flex w-full flex-col items-center justify-center'>
            <AcademicCapIcon className='h-12 w-12 text-gray-400' />
            <h3 className='mt-2 text-sm font-medium text-gray-900'>No class selected</h3>
            <p className='mt-1 text-sm text-gray-500'>
              {joinedClasses && joinedClasses.length > 0
                ? 'Choose a class in the left sidebar to get started.'
                : userProfile.role === 'instructor'
                ? 'Get started by creating a new class.'
                : 'Get started by joining a class.'}
            </p>
            {joinedClasses && joinedClasses.length === 0 && (
              <div className='mt-6'>
                <button
                  type='button'
                  onClick={onClassModalOpen}
                  className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                  <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
                  {userProfile.role === 'instructor' ? 'Create new class' : 'Join class'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
}
