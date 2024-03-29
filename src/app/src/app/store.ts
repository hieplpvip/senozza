import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { baseApiSlice } from '../features/api/base';
import { listenerMiddleware } from '../features/api/listener';
import authReducer from '../features/auth/authSlice';
import classReducer from '../features/class/classSlide';

export const store = configureStore({
  reducer: {
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    auth: authReducer,
    class: classReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiSlice.middleware, listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
