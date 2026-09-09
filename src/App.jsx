import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import { Navbar } from './components/Navbar'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ProductsPage } from './pages/ProductsPage'
import { ProductFormPage } from './pages/ProductFormPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus)

  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster position="top-right" />
      <Navbar />

      <main className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/products/new" element={<ProductFormPage />} />
            <Route path="/products/:id/edit" element={<ProductFormPage />} />
          </Route>

          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
