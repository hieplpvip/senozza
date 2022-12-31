import { Navigate } from 'react-router-dom';

import PostDetail from './components/PostDetail';
import PostList from './components/PostList';
import { useAppSelector } from '../../app/hooks';

export default function ClassFeed({ show }: { show?: boolean }) {
  const selectedClassId = useAppSelector((state) => state.class.selectedClassId);

  if (!selectedClassId) {
    return <Navigate to='/dashboard' replace />;
  }

  return (
    <div className={'flex min-w-0 flex-1 flex-col overflow-hidden' + (!show ? ' hidden' : '')}>
      <div className='relative z-0 flex flex-1 overflow-hidden'>
        <aside className='relative flex w-1/3 flex-shrink-0 flex-col overflow-hidden border-r-2 border-gray-200'>
          <PostList />
        </aside>

        <main className='relative z-0 grid flex-1 grid-rows-2 overflow-hidden focus:outline-none'>
          <PostDetail />
        </main>
      </div>
    </div>
  );
}
