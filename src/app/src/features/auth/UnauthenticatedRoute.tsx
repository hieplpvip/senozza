import { Navigate, Outlet } from 'react-router-dom';

import { useAuthAccessToken } from '../../app/hooks';

export default function UnauthenticatedRoute() {
  const accessToken = useAuthAccessToken();

  if (accessToken) {
    return <Navigate to='/dashboard' replace />;
  }

  return <Outlet />;
}
