import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from '../features/home/Home';
import Dashboard from '../features/dashboard/Dashboard';
import AuthLayout from '../features/auth/AuthLayout';
import AuthenticatedRoute from '../features/auth/AuthenticatedRoute';
import UnauthenticatedRoute from '../features/auth/UnauthenticatedRoute';
import SignIn from '../features/auth/SignIn';
import SignUp from '../features/auth/SignUp';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Home />}></Route>

      <Route element={<AuthLayout />}>
        <Route element={<UnauthenticatedRoute />}>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
        </Route>

        <Route element={<AuthenticatedRoute />}>
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='feed' element={<></>} />
            <Route path='settings' element={<></>} />
          </Route>
        </Route>
      </Route>
    </Route>,
  ),
  {
    basename: '/senozza',
  },
);
