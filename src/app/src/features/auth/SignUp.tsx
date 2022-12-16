export default function SignUp() {
  return (
    <>
      <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img className='mx-auto h-12 w-auto' src={process.env.PUBLIC_URL + '/logo.svg'} alt='Workflow' />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Create an account</h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' action='#' method='POST'>
              <div>
                <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>
                  First Name
                </label>
                <div className='mt-1'>
                  <input
                    id='firstName'
                    name='firstName'
                    type='text'
                    autoComplete='given-name'
                    required
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>
                  Last Name
                </label>
                <div className='mt-1'>
                  <input
                    id='lastName'
                    name='lastName'
                    type='text'
                    autoComplete='family-name'
                    required
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                  Email Address
                </label>
                <div className='mt-1'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                  Password
                </label>
                <div className='mt-1'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='new-password'
                    required
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='dob' className='block text-sm font-medium text-gray-700'>
                  Date of Birth
                </label>
                <div className='mt-1'>
                  <input
                    id='dob'
                    name='dob'
                    type='date'
                    autoComplete='bday'
                    required
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='role' className='block text-sm font-medium text-gray-700'>
                  Role
                </label>
                <select
                  id='role'
                  name='role'
                  className='mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  defaultValue='student'>
                  <option value='student'>Student</option>
                  <option value='ta'>Teacher Assistant</option>
                  <option value='instructor'>Instructor</option>
                </select>
              </div>

              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
