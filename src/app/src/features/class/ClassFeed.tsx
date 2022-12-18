import { classNames } from '../../utils';

const messages = [
  {
    id: 1,
    subject: 'Velit placeat sit ducimus non sed',
    sender: 'Gloria Roberston',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    selected: true,
  },
  {
    id: 2,
    subject: 'Velit placeat sit ducimus non sed',
    sender: 'Gloria Roberston',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    selected: false,
  },
  {
    id: 3,
    subject: 'Velit placeat sit ducimus non sed',
    sender: 'Gloria Roberston',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    selected: false,
  },
  {
    id: 4,
    subject: 'Velit placeat sit ducimus non sed',
    sender: 'Gloria Roberston',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    selected: false,
  },
  {
    id: 5,
    subject: 'Velit placeat sit ducimus non sed',
    sender: 'Gloria Roberston',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    selected: false,
  },
  {
    id: 6,
    subject: 'Velit placeat sit ducimus non sed',
    sender: 'Gloria Roberston',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    selected: false,
  },
];

export default function ClassFeed() {
  return (
    <div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
      <div className='relative z-0 flex flex-1 overflow-hidden'>
        <aside className='relative flex w-1/3 flex-shrink-0 flex-col overflow-y-auto border-r-2 border-gray-200'>
          <div className='relative flex h-full w-full flex-col border-gray-200 bg-gray-100'>
            <div className='flex-shrink-0'>
              <div className='flex h-16 flex-col justify-center bg-white px-6'>
                <div className='flex items-baseline space-x-3'>
                  <h2 className='text-lg font-medium text-gray-900'>Inbox</h2>
                  <p className='text-sm font-medium text-gray-500'>{messages.length} messages</p>
                </div>
              </div>
              <div className='border-t border-b border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500'>
                Sorted by date
              </div>
            </div>
            <nav aria-label='Message list' className='min-h-0 flex-1 overflow-y-auto'>
              <ul role='list' className='divide-y divide-gray-200 border-b border-gray-200'>
                {messages.map((message) => (
                  <li
                    key={message.id}
                    className={classNames(
                      message.selected ? 'rounded bg-blue-100' : 'bg-white hover:bg-gray-50',
                      'relative py-5 px-6',
                    )}>
                    <div className='flex justify-between space-x-3'>
                      <img className='my-auto h-6 w-6 rounded-full' src={message.imageUrl} alt='' />
                      <div className='min-w-0 flex-1'>
                        <a href={message.href} className='block focus:outline-none'>
                          <span className='absolute inset-0' aria-hidden='true' />
                          <p className='truncate text-sm font-medium text-gray-900'>{message.sender}</p>
                          <p className='truncate text-sm text-gray-500'>{message.subject}</p>
                        </a>
                      </div>
                      <time
                        dateTime={message.datetime}
                        className='flex-shrink-0 whitespace-nowrap text-sm text-gray-500'>
                        {message.date}
                      </time>
                    </div>
                    <div className='mt-1'>
                      <p className='line-clamp-2 text-sm text-gray-600'>{message.preview}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <main className='relative z-0 grid flex-1 grid-rows-2 overflow-y-auto focus:outline-none'>
          <div className='border-b-2 border-gray-200 py-6 px-8'>
            <div className='h-full rounded-lg border-2 border-dashed border-gray-200' />
          </div>
          <div className='py-6 px-8'>
            <div className='h-full rounded-lg border-2 border-dashed border-gray-200' />
          </div>
        </main>
      </div>
    </div>
  );
}
