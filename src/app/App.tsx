import { RouterProvider } from '@app/providers'
import { ThemeProvider } from '@shared/context'

export const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider />
    </ThemeProvider>
  )
}
