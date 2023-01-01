import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

import { setAccessToken } from './authSlice';
import { userApiSlice } from '../api';
import { useAppDispatch, useAuthAccessToken } from '../../app/hooks';
import { AUTH_ACCESS_TOKEN_KEY } from '../../constants';

export default function AuthLayout() {
  const dispatch = useAppDispatch();
  const accessToken = useAuthAccessToken() || localStorage.getItem(AUTH_ACCESS_TOKEN_KEY);
  const [stage, setStage] = useState(0);
  const [trigger, { isSuccess, isFetching }] = userApiSlice.endpoints.getUserProfile.useLazyQuery();

  useEffect(() => {
    if (accessToken) {
      trigger();
    } else {
      setStage(2);
    }
  }, []);

  useEffect(() => {
    if (isFetching && stage === 0) {
      setStage(1);
    } else if (!isFetching && stage === 1) {
      setStage(2);
      if (isSuccess && accessToken) {
        dispatch(setAccessToken(accessToken));
      }
    }
  }, [isFetching, isSuccess]);

  if (stage !== 2) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Spinner size='xl' />
      </div>
    );
  }

  return <Outlet />;
}
