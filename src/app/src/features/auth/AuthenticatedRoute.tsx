import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthAccessToken } from '../../app/hooks';

export default function AuthenticatedRoute() {
  const accessToken = useAuthAccessToken();
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to='/signin' replace state={{ from: location }} />;
  }

  return <Outlet />;
}
