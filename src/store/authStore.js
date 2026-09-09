import { create } from 'zustand'
import tesloApi from '../api/tesloApi'

const STATUS = {
  CHECKING: 'checking',
  AUTHENTICATED: 'authenticated',
  NOT_AUTHENTICATED: 'not-authenticated',
}

export const useAuthStore = create((set, get) => ({
  status: STATUS.CHECKING,
  user: null,
  errorMessage: null,

  login: async (email, password) => {
    try {
      const { data } = await tesloApi.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      set({ status: STATUS.AUTHENTICATED, user: data, errorMessage: null })
      return { ok: true }
    } catch (error) {
      const message = error.response?.data?.message ?? 'No se pudo iniciar sesión'
      set({ status: STATUS.NOT_AUTHENTICATED, user: null, errorMessage: message })
      return { ok: false, message }
    }
  },

  register: async (fullName, email, password) => {
    try {
      await tesloApi.post('/auth/register', { fullName, email, password })
      return await get().login(email, password)
    } catch (error) {
      const message = error.response?.data?.message ?? 'No se pudo crear la cuenta'
      set({ status: STATUS.NOT_AUTHENTICATED, user: null, errorMessage: message })
      return { ok: false, message }
    }
  },

  checkAuthStatus: async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      set({ status: STATUS.NOT_AUTHENTICATED, user: null })
      return
    }
    try {
      const { data } = await tesloApi.get('/auth/check-status')
      localStorage.setItem('token', data.token)
      set({ status: STATUS.AUTHENTICATED, user: data })
    } catch {
      localStorage.removeItem('token')
      set({ status: STATUS.NOT_AUTHENTICATED, user: null })
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ status: STATUS.NOT_AUTHENTICATED, user: null, errorMessage: null })
  },
}))

export { STATUS }
