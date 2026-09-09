import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/authStore'

const PASSWORD_PATTERN = /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

export function RegisterPage() {
  const register = useAuthStore((state) => state.register)
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const onChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    if (!PASSWORD_PATTERN.test(form.password)) {
      toast.error('La contraseña debe tener mayúscula, minúscula y un número')
      return
    }

    setLoading(true)
    const { ok, message } = await register(form.fullName, form.email, form.password)
    setLoading(false)

    if (!ok) {
      toast.error(message)
      return
    }

    toast.success('¡Cuenta creada!')
    navigate('/', { replace: true })
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-center text-2xl font-semibold text-slate-900">Crear cuenta</h1>
        <p className="mt-1 text-center text-sm text-slate-500">Regístrate en TesloShop</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Nombre completo
            </label>
            <input
              type="text"
              name="fullName"
              required
              minLength={1}
              value={form.fullName}
              onChange={onChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Juan Pérez"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Correo</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={onChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Contraseña</label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              maxLength={50}
              value={form.password}
              onChange={onChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="••••••••"
            />
            <p className="mt-1 text-xs text-slate-400">
              Mínimo 6 caracteres, con mayúscula, minúscula y un número.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
