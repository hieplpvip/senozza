import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../api';

interface SignInFormInput {
  email: string;
  password: string;
}

export default function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const { register, handleSubmit } = useForm<SignInFormInput>();

  const onSubmit = async (data: SignInFormInput) => {
    try {
      await signIn(data).unwrap();
      const origin = location.state?.from?.pathname || '/dashboard';
      navigate(origin);
    } catch (err) {
      console.error('Failed to sign in:', err);
    }
  };

  return (
    <>
      <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img className='mx-auto h-12 w-auto' src={process.env.PUBLIC_URL + '/logo.svg'} alt='Senozza' />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                  Email address
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
                    autoComplete='current-password'
                    required
                    className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    {...register('password')}
                  />
                </div>
              </div>

              {/* <div className='text-sm'>
                <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
                  Forgot your password?
                </a>
              </div> */}

              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                  Sign In
                </button>
                <p className='mt-6 text-center text-base font-medium text-gray-500'>
                  New user?{' '}
                  <Link to='/signup' className='text-indigo-600 hover:text-indigo-500'>
                    Sign Up
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
