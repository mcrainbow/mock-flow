import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { LoadingFallback } from '@shared/ui'

const HomePage = lazy(() => import('@pages/HomePage/HomePage'))
const AboutPage = lazy(() => import('@pages/AboutPage/AboutPage'))
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'))

export const routes = createBrowserRouter([
  {
    element: <LoadingFallback />,
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
])
