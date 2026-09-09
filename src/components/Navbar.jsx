import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore, STATUS } from '../store/authStore'

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
  }`

export function Navbar() {
  const status = useAuthStore((state) => state.status)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  const isAdmin = user?.roles?.includes('admin')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-slate-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="text-lg font-semibold tracking-tight text-white">
          Teslo<span className="text-indigo-400">Shop</span>
        </NavLink>

        <div className="flex items-center gap-2">
          <NavLink to="/" className={linkClass} end>
            Productos
          </NavLink>

          {isAdmin && (
            <NavLink to="/products/new" className={linkClass}>
              Nuevo producto
            </NavLink>
          )}

          {status === STATUS.AUTHENTICATED ? (
            <>
              <span className="hidden px-2 text-sm text-slate-400 sm:inline">
                {user?.fullName}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Ingresar
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
              >
                Crear cuenta
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
