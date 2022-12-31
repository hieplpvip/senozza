import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { theme as chakraTheme } from '@chakra-ui/theme';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import 'mac-scrollbar/dist/mac-scrollbar.css';

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from './tailwind.config';

const tailwind = resolveConfig(tailwindConfig);

// @ts-expect-error
chakraTheme.colors.blue = tailwind!.theme!.colors!.blue;

// @ts-expect-error
chakraTheme.colors.indigo = tailwind!.theme!.colors!.indigo;

import { router } from './app/router';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';

const theme = extendTheme({
  colors: {
    blue: {
      50: chakraTheme.colors.gray[50],
      100: chakraTheme.colors.gray[100],
    },
    darkBlue: {
      50: chakraTheme.colors.gray[50],
      500: chakraTheme.colors.blue[800],
      600: chakraTheme.colors.blue[700],
      700: chakraTheme.colors.blue[800],
      800: chakraTheme.colors.blue[900],
      900: chakraTheme.colors.blue[900],
    },
  },
});

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
