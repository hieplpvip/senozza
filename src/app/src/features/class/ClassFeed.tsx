import PostDetail from './components/PostDetail';
import PostList from './components/PostList';

export default function ClassFeed() {
  return (
    <div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
      <div className='relative z-0 flex flex-1 overflow-hidden'>
        <aside className='relative flex w-1/3 flex-shrink-0 flex-col overflow-y-auto border-r-2 border-gray-200'>
          <PostList />
        </aside>

        <main className='relative z-0 grid flex-1 grid-rows-2 overflow-hidden focus:outline-none'>
          <PostDetail />
        </main>
      </div>
    </div>
  );
}
