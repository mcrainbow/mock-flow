import { routes } from './routes'
import { RouterProvider as ReactRouterProvider } from 'react-router-dom'

export const RouterProvider = () => {
  return <ReactRouterProvider router={routes} />
}
