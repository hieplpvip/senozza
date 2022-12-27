import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

import { signOut, setUser } from './authSlice';
import { useGetUserDetailsQuery } from '../api/apiSlice';
import { useAppDispatch } from '../../app/hooks';
import { AUTH_TOKEN_KEY } from '../../constants';

export default function AuthLayout() {
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { data, isError, isSuccess } = useGetUserDetailsQuery(undefined, { skip: skip });

  useEffect(() => {
    if (localStorage.getItem(AUTH_TOKEN_KEY)) {
      setSkip(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      setIsLoading(false);
      dispatch(signOut());
    }
  }, [isError]);

  useEffect(() => {
    const accessToken = localStorage.getItem(AUTH_TOKEN_KEY);
    if (isSuccess && accessToken && data) {
      setIsLoading(false);
      dispatch(setUser({ accessToken, user: data }));
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Spinner size='xl' />
      </div>
    );
  }

  return <Outlet />;
}
