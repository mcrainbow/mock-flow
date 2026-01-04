import { Header } from '@/widgets/Header'
import { Outlet } from 'react-router-dom'
import clsx from 'clsx'

type LayoutVariant = 'app' | 'guest'

export default function AppLayout({ variant }: { variant: LayoutVariant }) {
  return (
    <div>
      <Header />
      <main className={clsx(variant === 'guest' ? 'pt-30' : 'pt-0')}>
        <Outlet />
      </main>
    </div>
  )
}
