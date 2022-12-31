import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { InformationCircleIcon, LinkIcon, UserGroupIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { MacScrollbar } from 'mac-scrollbar';

import { useAppSelector, useUserProfile } from '../../app/hooks';
import { classNames } from '../../utils';

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

function Details() {
  return (
    <div className='w-full p-4'>
      <h1 className='text-blue-gray-900 text-2xl font-medium'>CS300: Elements of Software Engineering</h1>
      <p className='text-m font-medium text-gray-500'>Fall 2022</p>

      <div className='divide-y-blue-gray-200 mt-6 space-y-8 divide-y'>
        <div className='grid grid-cols-6 gap-y-4 gap-x-6'>
          <div className='col-span-3'>
            <FormControl className='mb-3'>
              <FormLabel>Class number</FormLabel>
              <Input type='text' placeholder='e.g. CS300' />
            </FormControl>
          </div>

          <div className='col-span-3'>
            <FormControl className='mb-3'>
              <FormLabel>Class name</FormLabel>
              <Input type='text' placeholder='e.g. Elements of Software Engineering' />
            </FormControl>
          </div>

          <div className='col-span-6 flex justify-end'>
            <Button colorScheme='indigo'>Save</Button>
          </div>
        </div>

        <div className='flex flex-col gap-y-4 pt-8'>
          <div>
            <h2 className='text-xl font-bold text-gray-900'>Delete class</h2>
            <p className='mt-1 text-sm text-gray-500'>
              We will permanently delete this class and all of its data. This action cannot be undone. Be careful!
            </p>
          </div>

          <div>
            <Button colorScheme='red'>Delete class</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const people = [
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

function Members({ setPanel }: { setPanel: (panel: string) => void }) {
  return (
    <div className='flex h-full w-full flex-col p-4'>
      <div className='flex items-center'>
        <h1 className='text-blue-gray-900 flex-auto text-2xl font-medium'>Students (10)</h1>
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
            {people.map((person) => (
              <tr key={person.email}>
                <td className='whitespace-nowrap py-4 pr-3 pl-6 text-sm'>
                  <div className='flex items-center'>
                    <div className='h-10 w-10 flex-shrink-0'>
                      <img className='h-10 w-10 rounded-full' src={person.image} alt='' />
                    </div>
                    <div className='ml-4'>
                      <div className='font-medium text-gray-900'>{person.name}</div>
                      <div className='text-gray-500'>{person.email}</div>
                    </div>
                  </div>
                </td>
                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>7 months ago</td>
                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>Student</td>
                <td className='whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium'>
                  <a href='#' className='text-indigo-600 hover:text-indigo-900'>
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </MacScrollbar>
    </div>
  );
}

function Invite() {
  return (
    <div className='w-full p-4'>
      <div className='divide-y-blue-gray-200 space-y-8 divide-y'>
        <div className='flex flex-col gap-y-4'>
          <div>
            <h2 className='text-xl font-bold text-gray-900'>Invitation link</h2>
            <p className='mt-1 text-sm text-gray-500'>Send this link to your students to invite them to the class!</p>
          </div>

          <div className='flex flex-col gap-y-2'>
            <div className='flex items-center'>
              <div className='ml-8'>
                <div className='text-sm font-medium text-gray-900'>https://senozza.com/join-class/abc123</div>
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
                <div className='text-sm font-medium text-gray-900'>abc123</div>
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

export default function ClassSettings() {
  const selectedClassId = useAppSelector((state) => state.class.selectedClassId);
  const userProfile = useUserProfile();
  const [panel, setPanel] = useState('details');

  if (!selectedClassId || userProfile.role !== 'instructor') {
    return <Navigate to='/dashboard' replace />;
  }

  return (
    <div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
      <div className='relative z-0 flex flex-1 overflow-hidden'>
        <aside className='relative flex w-1/3 flex-shrink-0 flex-col border-r-2 border-gray-200'>
          <div className='border-blue-gray-200 flex h-16 flex-shrink-0 flex-col justify-center border-b bg-white px-4'>
            <div className='flex flex-col items-baseline'>
              <h2 className='text-lg font-medium text-gray-900'>Settings</h2>
              <p className='text-sm font-medium text-gray-500'>CS300: Elements of Software Engineering</p>
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
          {panel === 'details' && <Details />}
          {panel === 'members' && <Members setPanel={setPanel} />}
          {panel === 'invite' && <Invite />}
        </main>
      </div>
    </div>
  );
}
