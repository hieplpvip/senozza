import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import { authApiSlice } from './auth';
import { signOut, setAccessToken } from '../auth/authSlice';

export const listenerMiddleware = createListenerMiddleware();

// Reset everything when auth state changes
listenerMiddleware.startListening({
  matcher: isAnyOf(
    signOut,
    setAccessToken,
    authApiSlice.endpoints.signIn.matchFulfilled,
    authApiSlice.endpoints.signUp.matchFulfilled,
  ),
  effect: (_, listenerApi) => {
    listenerApi.dispatch(authApiSlice.util.resetApiState());
  },
});
