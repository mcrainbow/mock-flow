import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoadingFallback } from '@shared/ui';
import { GuestLayout } from '../layouts';
import { PageError } from '@widgets/PageError';
import { GuestRoutesTypes, UserRoutesTypes } from '@shared/lib';
import { AppLayout } from '../layouts';
import { ProtectedRoutFromGuest } from '../providers/ProtectedRoutes/ProtectedRoutFromGuest';
import { ProtectedRoutesFromUser } from '../providers/ProtectedRoutes/ProtectedRoutesFromUser';

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
        element: (
          <ProtectedRoutesFromUser>
            <GuestLayout />
          </ProtectedRoutesFromUser>
        ),
        errorElement: <PageError />,
        children: [
          {
            path: GuestRoutesTypes.HOME,
            element: <HomePage />,
          },
          {
            path: GuestRoutesTypes.ABOUT,
            element: <AboutPage />,
          },

          {
            path: GuestRoutesTypes.LOGIN,
            element: <LoginPage />,
          },
          {
            path: GuestRoutesTypes.SIGNUP,
            element: <SignupPage />,
          },
        ],
      },
      {
        path: '/app',
        element: (
          <ProtectedRoutFromGuest>
            <AppLayout />
          </ProtectedRoutFromGuest>
        ),
        children: [
          {
            path: UserRoutesTypes.INTERVIEW,
            element: (
              <div>
                <h2>Main</h2>
              </div>
            ),
          },
          {
            path: UserRoutesTypes.DASHBOARD,
            element: (
              <div>
                <h2>Dashboard</h2>
              </div>
            ),
          },
          {
            path: UserRoutesTypes.PROFILE,
            element: (
              <div>
                <h2>Profile</h2>
              </div>
            ),
          },
          {
            path: UserRoutesTypes.SETTINGS,
            element: (
              <div>
                <h2>Settings</h2>
              </div>
            ),
          },
        ],
      },
      {
        path: GuestRoutesTypes.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
]);
