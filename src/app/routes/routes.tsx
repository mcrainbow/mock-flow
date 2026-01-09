import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoadingFallback } from '@shared/ui';
import { GuestLayout } from '../layouts';
import { PageError } from '@widgets/PageError';
import { RoutesTypes } from '@/shared/lib';

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
        element: <GuestLayout />,
        errorElement: <PageError />,
        children: [
          {
            path: RoutesTypes.HOME,
            element: <HomePage />,
          },
          {
            path: RoutesTypes.ABOUT,
            element: <AboutPage />,
          },
          {
            path: RoutesTypes.NOT_FOUND,
            element: <NotFoundPage />,
          },
          {
            path: RoutesTypes.LOGIN,
            element: <LoginPage />,
          },
          {
            path: RoutesTypes.SIGNUP,
            element: <SignupPage />,
          },
        ],
      },
    ],
  },
]);
