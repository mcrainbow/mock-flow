import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-error mb-spacing-md">404</h1>
      <p className="text-xl text-text-secondary mb-spacing-lg">
        Page not found
      </p>
      <Link to="/" className="btn-primary">
        Go Home
      </Link>
    </div>
  )
}
