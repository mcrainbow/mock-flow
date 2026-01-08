import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoadingFallback } from '@shared/ui';
import AppLayout from '../layouts/AppLayout/AppLayout';
import { PageError } from '@widgets/PageError';

const HomePage = lazy(() => import('@pages/HomePage/HomePage'));
const AboutPage = lazy(() => import('@pages/AboutPage/AboutPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'));
const LoginPage = lazy(() => import('@pages/LoginPage/LoginPage'));
const SignupPage = lazy(() => import('@pages/SignupPage/SignupPage'));

export const routes = createBrowserRouter([
  {
    element: <LoadingFallback />,
    children: [
      {
        element: <AppLayout variant="guest" />,
        errorElement: <PageError />,
        children: [
          {
            path: '/',
            element: <HomePage />,
          },
          {
            path: '/about',
            element: <AboutPage />,
          },
          {
            path: '*',
            element: <NotFoundPage />,
          },
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/register',
            element: <SignupPage />,
          },
        ],
      },
    ],
  },
]);
