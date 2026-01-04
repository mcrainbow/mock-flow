import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { LoadingFallback } from '@shared/ui'
import AppLayout from '../layouts/AppLayout/AppLayout'

const HomePage = lazy(() => import('@pages/HomePage/HomePage'))
const AboutPage = lazy(() => import('@pages/AboutPage/AboutPage'))
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'))

export const routes = createBrowserRouter([
  {
    element: <LoadingFallback />,
    children: [
      {
        element: <AppLayout variant="guest" />,
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
        ],
      },
    ],
  },
])
