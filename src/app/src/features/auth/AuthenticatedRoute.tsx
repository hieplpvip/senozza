import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '../../app/hooks';

export default function AuthenticatedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to='/signin' replace state={{ from: location }} />;
  }

  return <Outlet />;
}
