import { useState } from 'react';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { InformationCircleIcon, UserGroupIcon, UserPlusIcon } from '@heroicons/react/24/outline';

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

      <form className='divide-y-blue-gray-200 mt-6 space-y-8 divide-y'>
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
      </form>
    </div>
  );
}

function Members() {
  return <></>;
}

function Invite() {
  return <></>;
}

export default function ClassSettings() {
  const [panel, setPanel] = useState('details');

  return (
    <div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
      <div className='relative z-0 flex flex-1 overflow-hidden'>
        <aside className='relative flex w-1/3 flex-shrink-0 flex-col overflow-y-auto border-r-2 border-gray-200'>
          <div className='border-blue-gray-200 flex h-16 flex-shrink-0 flex-col justify-center border-b bg-white px-4'>
            <div className='flex flex-col items-baseline'>
              <h2 className='text-lg font-medium text-gray-900'>Settings</h2>
              <p className='text-sm font-medium text-gray-500'>CS300: Elements of Software Engineering</p>
            </div>
          </div>
          <div className='min-h-0 flex-1 overflow-y-auto'>
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
          </div>
        </aside>

        <main className='relative z-0 flex-1 overflow-hidden focus:outline-none'>
          {panel === 'details' && <Details />}
          {panel === 'members' && <Members />}
          {panel === 'invite' && <Invite />}
        </main>
      </div>
    </div>
  );
}
