import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

import { setAccessToken } from './authSlice';
import { apiSlice } from '../api/apiSlice';
import { useAppDispatch, useAuthAccessToken } from '../../app/hooks';
import { AUTH_ACCESS_TOKEN_KEY } from '../../constants';

export default function AuthLayout() {
  const dispatch = useAppDispatch();
  const accessToken = useAuthAccessToken() || localStorage.getItem(AUTH_ACCESS_TOKEN_KEY);
  const [isLoading, setIsLoading] = useState(true);
  const [trigger, { isError, isSuccess }] = apiSlice.endpoints.getUserInfo.useLazyQuery();

  useEffect(() => {
    if (accessToken) {
      trigger();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      setIsLoading(false);
    }
  }, [isError]);

  useEffect(() => {
    if (isLoading && isSuccess && accessToken) {
      setIsLoading(false);
      dispatch(setAccessToken(accessToken));
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
