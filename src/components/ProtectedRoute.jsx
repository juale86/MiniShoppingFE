import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore, STATUS } from '../store/authStore'

export function ProtectedRoute({ adminOnly = false }) {
  const status = useAuthStore((state) => state.status)
  const user = useAuthStore((state) => state.user)

  if (status === STATUS.CHECKING) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 text-slate-400">
        Cargando...
      </div>
    )
  }

  if (status === STATUS.NOT_AUTHENTICATED) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && !user?.roles?.includes('admin')) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
