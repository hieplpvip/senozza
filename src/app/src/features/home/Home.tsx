import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className='relative h-full bg-gray-50'>
      <Popover className='relative bg-white shadow'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
          <div className='flex items-center justify-between py-6 md:justify-start md:space-x-10'>
            <div className='flex justify-start lg:w-0 lg:flex-1'>
              <a href='#'>
                <span className='sr-only'>Senozza</span>
                <img className='h-8 w-auto sm:h-10' src={process.env.PUBLIC_URL + '/logo.svg'} />
              </a>
            </div>
            <div className='-my-2 -mr-2 md:hidden'>
              <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                <span className='sr-only'>Open menu</span>
                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
              </Popover.Button>
            </div>
            <div className='hidden items-center justify-end md:flex md:flex-1 lg:w-0'>
              <Link to='/signin' className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'>
                Sign In
              </Link>
              <Link
                to='/signup'
                className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'>
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter='duration-200 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'>
          <Popover.Panel
            focus
            className='absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden'>
            <div className='divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
              <div className='px-5 pt-5 pb-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <img className='h-8 w-auto' src={process.env.PUBLIC_URL + '/logo.svg'} alt='Senozza' />
                  </div>
                  <div className='-mr-2'>
                    <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                      <span className='sr-only'>Close menu</span>
                      <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className='space-y-6 py-6 px-5'>
                <div>
                  <Link
                    to='/signup'
                    className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'>
                    Sign Up
                  </Link>
                  <p className='mt-6 text-center text-base font-medium text-gray-500'>
                    Existing user?{' '}
                    <Link to='/signin' className='text-indigo-600 hover:text-indigo-500'>
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      <main className='mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32'>
        <div className='lg:grid lg:grid-cols-12 lg:gap-8'>
          <div className='sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left'>
            <h1>
              <span className='mt-1 block text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl'>
                <span className='block text-gray-900'>Where people</span>
                <span className='block text-indigo-600'>learn together</span>
              </span>
            </h1>
            <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl'>
              Senozza is an online space for your class that makes teaching and learning online easy — free forever.
            </p>
            <div className='mt-10 sm:flex sm:justify-center lg:justify-start'>
              <div className='rounded-md shadow'>
                <Link
                  to='/signup'
                  className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg'>
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          <div className='relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center'>
            <div className='relative mx-auto w-full'>
              <img className='w-full' src='https://static.campuswire.com/images/platform-banner.png' />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
