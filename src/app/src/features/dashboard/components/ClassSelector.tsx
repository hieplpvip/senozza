import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';

import CreateClassModal from './CreateClassModal';
import JoinClassModal from './JoinClassModal';
import { useGetClassByIdQuery, useGetJoinedClassesQuery } from '../../api';
import { setSelectedClassId } from '../../class/classSlide';
import { useAppDispatch, useAppSelector, useIsInstructor } from '../../../app/hooks';
import { classNames } from '../../../utils';

export default function ClassSelector({
  isClassModalOpen,
  onClassModalOpen,
  onClassModalClose,
}: {
  isClassModalOpen: boolean;
  onClassModalOpen: () => void;
  onClassModalClose: () => void;
}) {
  const isInstructor = useIsInstructor();
  const dispatch = useAppDispatch();

  const selectedClassId = useAppSelector((state) => state.class.selectedClassId);
  const { data: joinedClasses } = useGetJoinedClassesQuery();
  const { data: selectedClass, isSuccess: hasClassData } = useGetClassByIdQuery(selectedClassId, {
    skip: !selectedClassId,
  });

  const handleSelect = (classId: string) => {
    dispatch(setSelectedClassId(classId));
  };

  return (
    <>
      {isInstructor ? (
        <CreateClassModal isOpen={isClassModalOpen} onClose={onClassModalClose} />
      ) : (
        <JoinClassModal isOpen={isClassModalOpen} onClose={onClassModalClose} />
      )}
      <Listbox value={selectedClassId} onChange={handleSelect}>
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
                      <span className='ml-3 block truncate'>
                        {selectedClass.courseCode}: {selectedClass.courseName}
                      </span>
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
                  <Listbox.Option key={-1} value={selectedClassId}>
                    <div className='p-2'>
                      <button
                        type='button'
                        className='mx-auto w-full rounded-full border border-gray-300 p-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        onClick={onClassModalOpen}>
                        <span className='text-sm font-medium text-gray-500'>
                          <PlusIcon className='-mt-[0.22rem] mr-1 inline-block h-5 w-5' aria-hidden='true' />
                          {isInstructor ? 'Create new class' : 'Join class'}
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
                                {c.courseCode}: {c.courseName}
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
