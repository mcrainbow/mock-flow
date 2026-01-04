import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export const LoadingFallback = () => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-text-secondary">Загрузка...</div>
      </div>
    }
  >
    <Outlet />
  </Suspense>
)
