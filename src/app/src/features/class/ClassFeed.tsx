export default function ClassFeed() {
  return (
    <div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
      <div className='relative z-0 flex flex-1 overflow-hidden'>
        <aside className='relative flex w-96 flex-shrink-0 flex-col overflow-y-auto border-r border-gray-200'>
          {/* Start secondary column */}
          <div className='absolute inset-0 py-6 px-8'>
            <div className='h-full rounded-lg border-2 border-dashed border-gray-200' />
          </div>
          {/* End secondary column */}
        </aside>
        <main className='relative z-0 flex-1 overflow-y-auto focus:outline-none'>
          {/* Start main area*/}
          <div className='absolute inset-0 py-6 px-8'>
            <div className='h-full rounded-lg border-2 border-dashed border-gray-200' />
          </div>
          {/* End main area */}
        </main>
      </div>
    </div>
  );
}
