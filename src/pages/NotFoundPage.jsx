import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-24 text-center">
      <h1 className="text-3xl font-semibold text-slate-900">404</h1>
      <p className="text-slate-500">La página que buscas no existe.</p>
      <Link to="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
        Volver al inicio
      </Link>
    </div>
  )
}
