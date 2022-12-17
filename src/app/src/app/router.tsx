import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from '../features/home/Home';
import Dashboard from '../features/dashboard/Dashboard';
import SignIn from '../features/auth/SignIn';
import SignUp from '../features/auth/SignUp';
import ClassFeed from '../features/class/ClassFeed';
import ChatRoom from '../features/chatroom/ChatRoom';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Home />}></Route>
      <Route path='/signin' element={<SignIn />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/dashboard' element={<Dashboard />}>
        <Route path='feed' element={<ClassFeed />} />
        <Route path='chat' element={<ChatRoom />} />
        <Route path='notifications' element={<></>} />
      </Route>
    </Route>,
  ),
);
