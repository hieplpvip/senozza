import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../app/hooks';

export default function UnauthenticatedRoute() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to='/dashboard' replace />;
  }

  return <Outlet />;
}
