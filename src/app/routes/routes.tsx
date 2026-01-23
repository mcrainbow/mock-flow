import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoadingFallback } from '@shared/ui';
import { PageError, AppPageError } from '@widgets/PageError';
import { GuestRoutesTypes, UserRoutesTypes } from '@shared/lib';
import { AppLayout, GuestLayout } from '@app/layouts';
import {
  ProtectedRoutesFromGuest,
  ProtectedRoutesFromUser,
  ProtectedLoadingRoute,
} from '@app/providers/ProtectedRoutes';

const HomePage = lazy(() => import('@pages/HomePage/HomePage'));
const AboutPage = lazy(() => import('@pages/AboutPage/AboutPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'));
const LoginPage = lazy(() => import('@pages/LoginPage/LoginPage'));
const SignupPage = lazy(() => import('@pages/SignupPage/SignupPage'));
const InterviewPage = lazy(() => import('@pages/InterviewPage/InterviewPage'));
const InterviewDashboardPage = lazy(
  () => import('@pages/InterviewDashboardPage/InterviewDashboardPage')
);
const ActiveInterviewPage = lazy(() => import('@pages/ActiveInterviewpage/ActiveInterviewPage'));
const LoadingInterviewPage = lazy(() => import('@pages/LoadingInterviewPage/LoadingInterviewPage'));
const InterviewResultsPage = lazy(() => import('@pages/InterviewResultsPage/InterviewResultsPage'));
const UserInterviewsPage = lazy(() => import('@pages/UserInterviewsPage/UserInterviewsPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage/ProfilePage'));
const SettingsPage = lazy(() => import('@pages/SettingsPage/SettingsPage'));

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
          <ProtectedRoutesFromGuest>
            <AppLayout />
          </ProtectedRoutesFromGuest>
        ),
        errorElement: <AppPageError />,
        children: [
          {
            path: UserRoutesTypes.INTERVIEW_ID,
            element: <ActiveInterviewPage />,
          },
          {
            path: UserRoutesTypes.INTERVIEW_ID_RESULTS,
            element: <InterviewResultsPage />,
          },
          {
            path: UserRoutesTypes.INTERVIEW_LOADING_INTERVIEW,
            element: (
              <ProtectedLoadingRoute>
                <LoadingInterviewPage />
              </ProtectedLoadingRoute>
            ),
          },
          {
            path: UserRoutesTypes.INTERVIEW,
            element: <InterviewPage />,
          },
          {
            path: UserRoutesTypes.DASHBOARD,
            element: <InterviewDashboardPage />,
          },
          {
            path: UserRoutesTypes.MY_INTERVIEWS,
            element: <UserInterviewsPage />,
          },
          {
            path: UserRoutesTypes.PROFILE,
            element: <ProfilePage />,
          },
          {
            path: UserRoutesTypes.SETTINGS,
            element: <SettingsPage />,
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
