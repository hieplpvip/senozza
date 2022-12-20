import { PencilIcon } from '@heroicons/react/24/solid';
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid';

function Comment() {
  return (
    <div className='mx-auto mt-3 w-full flex-col border-b-2 border-r-2 border-gray-200 bg-white p-4 sm:rounded-lg sm:shadow-sm'>
      <div className='flex flex-row'>
        <div className='flex flex-col justify-center'>
          <button>
            <ChevronDoubleUpIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
            <span className='text-gray-500'>0</span>
          </button>
        </div>
        <div className='flex-col'>
          <div className='flex flex-1 items-center font-bold leading-tight'>
            <img
              className='mx-2 h-9 w-9 rounded-full border-2 border-gray-300'
              src='https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80'
            />
            Anonymous
            <span className='ml-1 text-xs font-normal text-gray-500'>answered this question 3 days ago</span>
          </div>
          <div className='flex-1 px-2 text-sm font-medium leading-loose text-gray-600'>Very cool!</div>
        </div>
      </div>
    </div>
  );
}

function CommentBox() {
  return (
    <div className='flex h-full w-full flex-col bg-white'>
      <div className='mx-3 flex items-center border-b border-gray-200'>
        <nav className='-mb-px flex flex-1 space-x-6 xl:space-x-8' aria-label='Tabs'>
          <span className='whitespace-nowrap border-b-2 border-indigo-500 py-4 px-1 text-sm font-medium text-indigo-600'>
            Comments
          </span>
        </nav>
      </div>
      <section className='min-h-0 flex-1 overflow-y-auto'>
        <div className='container mx-auto px-0 sm:px-5'>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </section>
    </div>
  );
}

export default function PostDetail() {
  return (
    <>
      <div className='flex flex-col py-4 px-4'>
        <div className='flex items-center justify-between space-x-4 pb-2'>
          <div>
            <div className='flex flex-1 items-center font-bold leading-tight'>
              <img
                className='mr-2 h-7 w-7 rounded-full border-2 border-gray-300'
                src='https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80'
              />
              Anonymous
              <span className='ml-1 text-xs font-normal text-gray-500'>asked a question 3 days ago</span>
            </div>
            <div className='flex flex-row'>
              <h1 className='text-2xl font-bold text-gray-900'>ARIA attribute misspelled</h1>
              <div className='ml-2 flex flex-col justify-center'>
                <span className='text-sm text-gray-500'>#1111</span>
              </div>
            </div>
          </div>
          <div className='flex space-x-3'>
            <button
              type='button'
              className='inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'>
              <PencilIcon className='-ml-1 mr-2 h-5 w-5 text-gray-400' aria-hidden='true' />
              <span>Edit</span>
            </button>
          </div>
        </div>

        <div className='h-full rounded-lg border-2 border-dashed border-gray-200' />
      </div>
      <div>
        <CommentBox />
      </div>
    </>
  );
}
