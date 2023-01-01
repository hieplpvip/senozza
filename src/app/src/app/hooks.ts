import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { useGetUserProfileQuery } from '../features/api';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuthAccessToken = () => {
  const token = useAppSelector((state) => state.auth.accessToken);
  return token;
};

export const useUserProfile = () => {
  const { data } = useGetUserProfileQuery();
  return data!;
};

export const useIsInstructor = () => {
  const { role } = useUserProfile();
  return role === 'instructor';
};
