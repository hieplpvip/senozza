import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../api';
import { UserRole } from '../../interface';
import { simpleHash } from '../../utils';

interface SignUpFormInput {
  email: string;
  firstName: string;
  lastName: string;
  birth: string;
  role: UserRole;
  imgUrl: string;
  password: string;
}

export default function SignUp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const { register, handleSubmit } = useForm<SignUpFormInput>();

  const onSubmit = async (data: SignUpFormInput) => {
    try {
      await signUp({
        ...data,
        imgUrl: `https://avatars.dicebear.com/api/bottts/${simpleHash(data.email)}.svg?size=128`,
      }).unwrap();
      const origin = location.state?.from?.pathname || '/dashboard';
      navigate(origin);
    } catch (err) {
      alert(`Failed to sign up: ${err}`);
    }
  };

  return (
    <>
      <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img className='mx-auto h-12 w-auto' src={process.env.PUBLIC_URL + '/logo.svg'} alt='Senozza' />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Create an account</h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>
                  First Name
                </label>
                <div className='mt-1'>
                  <input
                    id='firstName'
                    type='text'
                    autoComplete='given-name'
                    required
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    {...register('firstName')}
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
                    type='text'
                    autoComplete='family-name'
                    required
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    {...register('lastName')}
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
                    type='email'
                    autoComplete='email'
                    required
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    {...register('email')}
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
                    type='password'
                    autoComplete='new-password'
                    required
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    {...register('password')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor='birth' className='block text-sm font-medium text-gray-700'>
                  Date of Birth
                </label>
                <div className='mt-1'>
                  <input
                    id='birth'
                    type='date'
                    autoComplete='bday'
                    required
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    {...register('birth')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor='role' className='block text-sm font-medium text-gray-700'>
                  Role
                </label>
                <select
                  id='role'
                  className='mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  defaultValue='student'
                  {...register('role')}>
                  <option value='student'>Student</option>
                  <option value='instructor'>Instructor</option>
                </select>
              </div>

              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                  Sign Up
                </button>
                <p className='mt-6 text-center text-base font-medium text-gray-500'>
                  Existing user?{' '}
                  <Link to='/signin' className='text-indigo-600 hover:text-indigo-500'>
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
