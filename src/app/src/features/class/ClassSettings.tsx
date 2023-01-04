import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { Button, FormControl, FormLabel, Input, Spinner } from '@chakra-ui/react';
import { InformationCircleIcon, LinkIcon, UserGroupIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { MacScrollbar } from 'mac-scrollbar';

import {
  useDeleteClassMutation,
  useEditClassMutation,
  useGetClassByIdQuery,
  useGetStudentsInClassQuery,
  useLeaveClassMutation,
} from '../api';
import { useAppSelector, useIsInstructor } from '../../app/hooks';
import { capitalize, classNames } from '../../utils';

const panels = [
  {
    key: 'details',
    name: 'Class details',
    description: 'Change your class names',
    icon: InformationCircleIcon,
  },
  {
    key: 'members',
    name: 'Class members',
    description: 'See and edit your class roster',
    icon: UserGroupIcon,
  },
  {
    key: 'invite',
    name: 'Invite people',
    description: 'Invite people to join this class',
    icon: UserPlusIcon,
  },
];

function useClassData() {
  const selectedClassId = useAppSelector((state) => state.class.selectedClassId);
  const { data } = useGetClassByIdQuery(selectedClassId, { skip: !selectedClassId });
  return data!;
}

function Details({ show }: { show?: boolean }) {
  interface ClassDetailsInput {
    courseCode: string;
    courseName: string;
  }

  const data = useClassData();
  const isInstructor = useIsInstructor();
  const [editClass] = useEditClassMutation();
  const [deleteClass] = useDeleteClassMutation();
  const [leaveClass] = useLeaveClassMutation();
  const { register, handleSubmit } = useForm<ClassDetailsInput>({
    values: { courseCode: data.courseCode, courseName: data.courseName },
  });

  const onSubmit = async (body: ClassDetailsInput) => {
    try {
      await editClass({ classId: data._id, body }).unwrap();
    } catch (err) {
      alert(`Failed to change class details: ${err}`);
    }
  };

  const onDeleteClass = async () => {
    try {
      await deleteClass(data._id).unwrap();
    } catch (err) {
      alert(`Failed to delete class: ${err}`);
    }
  };

  const onLeaveClass = async () => {
    try {
      await leaveClass(data._id).unwrap();
    } catch (err) {
      alert(`Failed to delete class: ${err}`);
    }
  };

  return (
    <div className={'w-full p-4' + (!show ? ' hidden' : '')}>
      <h1 className='text-blue-gray-900 text-2xl font-medium'>
        {data.courseCode}: {data.courseName}
      </h1>
      <p className='text-m font-medium text-gray-500'>Fall 2022</p>

      <div className='divide-y-blue-gray-200 mt-6 space-y-8 divide-y'>
        <form className='grid grid-cols-6 gap-y-4 gap-x-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='col-span-3'>
            <FormControl className='mb-3'>
              <FormLabel>Class code</FormLabel>
              <Input type='text' placeholder='e.g. CS300' readOnly={!isInstructor} {...register('courseCode')} />
            </FormControl>
          </div>

          <div className='col-span-3'>
            <FormControl className='mb-3'>
              <FormLabel>Class name</FormLabel>
              <Input
                type='text'
                placeholder='e.g. Elements of Software Engineering'
                readOnly={!isInstructor}
                {...register('courseName')}
              />
            </FormControl>
          </div>

          {isInstructor && (
            <div className='col-span-6 flex justify-end'>
              <Button type='submit' colorScheme='indigo'>
                Save
              </Button>
            </div>
          )}
        </form>

        {isInstructor && (
          <div className='flex flex-col gap-y-4 pt-8'>
            <div>
              <h2 className='text-xl font-bold text-gray-900'>Delete class</h2>
              <p className='mt-1 text-sm text-gray-500'>
                We will permanently delete this class and all of its data. This action cannot be undone. Be careful!
              </p>
            </div>

            <div>
              <Button colorScheme='red' onClick={onDeleteClass}>
                Delete class
              </Button>
            </div>
          </div>
        )}

        {!isInstructor && (
          <div className='flex flex-col gap-y-4 pt-8'>
            <div>
              <h2 className='text-xl font-bold text-gray-900'>Leave class</h2>
              <p className='mt-1 text-sm text-gray-500'>
                After leaving, you will no longer be able to access this class. Be careful!
              </p>
            </div>

            <div>
              <Button colorScheme='red' onClick={onLeaveClass}>
                Leave class
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Members({ setPanel, show }: { setPanel: (panel: string) => void; show?: boolean }) {
  const selectedClassId = useAppSelector((state) => state.class.selectedClassId);
  const {
    data: members,
    isFetching,
    isSuccess,
  } = useGetStudentsInClassQuery(selectedClassId, { skip: !selectedClassId });
  const isInstructor = useIsInstructor();

  if (isFetching || !isSuccess) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Spinner size='xl' />
      </div>
    );
  }

  return (
    <div className={'flex h-full w-full flex-col p-4' + (!show ? ' hidden' : '')}>
      <div className='flex items-center'>
        <h1 className='text-blue-gray-900 flex-auto text-2xl font-medium'>Members ({members.length})</h1>
        <Button colorScheme='indigo' onClick={() => setPanel('invite')}>
          Add student
        </Button>
      </div>
      <MacScrollbar className='mt-8 rounded-lg align-middle shadow ring-1 ring-black ring-opacity-5'>
        <table className='min-w-full divide-y divide-gray-300'>
          <thead className='sticky top-0 bg-gray-50'>
            <tr>
              <th scope='col' className='py-3.5 pr-3 pl-6 text-left text-sm font-semibold text-gray-900'>
                Name
              </th>
              <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                Joined
              </th>
              <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                Role
              </th>
              <th scope='col' className='px-3 py-3.5 text-sm font-semibold text-gray-900'>
                <span className='sr-only'>Remove</span>
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {members.map((member) => (
              <tr key={member._id}>
                <td className='whitespace-nowrap py-4 pr-3 pl-6 text-sm'>
                  <div className='flex items-center'>
                    <div className='h-10 w-10 flex-shrink-0'>
                      <img className='h-10 w-10 rounded-full' src={member.imgUrl} />
                    </div>
                    <div className='ml-4'>
                      <div className='font-medium text-gray-900'>
                        {member.firstName} {member.lastName}
                      </div>
                      <div className='text-gray-500'>{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>7 months ago</td>
                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{capitalize(member.role)}</td>
                <td className='whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium'>
                  {isInstructor && member.role !== 'instructor' && (
                    <a href='#' className='text-indigo-600 hover:text-indigo-900'>
                      Remove
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </MacScrollbar>
    </div>
  );
}

function Invite({ show }: { show?: boolean }) {
  const data = useClassData();

  return (
    <div className={'w-full p-4' + (!show ? ' hidden' : '')}>
      <div className='divide-y-blue-gray-200 space-y-8 divide-y'>
        <div className='flex flex-col gap-y-4'>
          <div>
            <h2 className='text-xl font-bold text-gray-900'>Invitation link</h2>
            <p className='mt-1 text-sm text-gray-500'>Send this link to your students to invite them to the class!</p>
          </div>

          <div className='flex flex-col gap-y-2'>
            <div className='flex items-center'>
              <div className='ml-8'>
                <div className='text-sm font-medium text-gray-900'>
                  https://senozza.com/join-class/{data.inviteCode}
                </div>
              </div>
              <div className='ml-4 flex-1'>
                <button className='group flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-900'>
                  <LinkIcon className='mr-1 h-5 w-5 text-indigo-500 group-hover:text-indigo-900' aria-hidden='true' />
                  <span>Copy link</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-y-4 pt-8'>
          <div>
            <h2 className='text-xl font-bold text-gray-900'>Invitation code</h2>
            <p className='mt-1 text-sm text-gray-500'>
              Or if you prefer joining by code, send this code to your students!
            </p>
          </div>

          <div className='flex flex-col gap-y-2'>
            <div className='flex items-center'>
              <div className='ml-8'>
                <div className='text-sm font-medium text-gray-900'>{data.inviteCode}</div>
              </div>
              <div className='ml-4 flex-1'>
                <button className='group flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-900'>
                  <LinkIcon className='mr-1 h-5 w-5 text-indigo-500 group-hover:text-indigo-900' aria-hidden='true' />
                  <span>Copy code</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClassSettings({ show }: { show?: boolean }) {
  const selectedClassId = useAppSelector((state) => state.class.selectedClassId);
  const [panel, setPanel] = useState('details');
  const { data, isFetching, isSuccess } = useGetClassByIdQuery(selectedClassId, { skip: !selectedClassId });

  if (!selectedClassId) {
    return <Navigate to='/dashboard' replace />;
  }

  if (isFetching || !isSuccess) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Spinner size='xl' />
      </div>
    );
  }

  return (
    <div className={'flex min-w-0 flex-1 flex-col overflow-hidden' + (!show ? ' hidden' : '')}>
      <div className='relative z-0 flex flex-1 overflow-hidden'>
        <aside className='relative flex w-1/3 flex-shrink-0 flex-col border-r-2 border-gray-200'>
          <div className='border-blue-gray-200 flex h-16 flex-shrink-0 flex-col justify-center border-b bg-white px-4'>
            <div className='flex flex-col items-baseline'>
              <h2 className='text-lg font-medium text-gray-900'>Settings</h2>
              <p className='text-sm font-medium text-gray-500'>
                {data.courseCode}: {data.courseName}
              </p>
            </div>
          </div>
          <MacScrollbar className='min-h-0 flex-1'>
            {panels.map((item) => (
              <button
                type='button'
                key={item.key}
                className={classNames(
                  item.key === panel ? 'bg-gray-200 text-gray-900' : ' hover:bg-gray-50',
                  'border-blue-gray-200 flex w-full flex-col border-b p-4',
                )}
                onClick={() => setPanel(item.key)}>
                <div className='flex items-center text-sm'>
                  <item.icon className='h-5 w-5 flex-shrink-0' aria-hidden='true' />
                  <p className='ml-2 font-medium '>{item.name}</p>
                </div>
                <p className='mt-1 text-sm text-gray-500'>{item.description}</p>
              </button>
            ))}
          </MacScrollbar>
        </aside>

        <main className='relative z-0 flex-1 overflow-hidden focus:outline-none'>
          <Details show={panel === 'details'} />
          <Members setPanel={setPanel} show={panel === 'members'} />
          <Invite show={panel === 'invite'} />
        </main>
      </div>
    </div>
  );
}
