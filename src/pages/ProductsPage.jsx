import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import tesloApi from '../api/tesloApi'
import { useAuthStore } from '../store/authStore'
import { ProductCard } from '../components/ProductCard'

const PAGE_SIZE = 10

export function ProductsPage() {
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.roles?.includes('admin')

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)

  const loadProducts = async () => {
    setLoading(true)
    try {
      const { data } = await tesloApi.get('/products', {
        params: { limit: PAGE_SIZE, offset: page * PAGE_SIZE },
      })
      setProducts(data)
    } catch {
      toast.error('No se pudieron cargar los productos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleDelete = async (product) => {
    if (!confirm(`¿Eliminar "${product.title}"?`)) return
    try {
      await tesloApi.delete(`/products/${product.id}`)
      toast.success('Producto eliminado')
      loadProducts()
    } catch {
      toast.error('No se pudo eliminar el producto')
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Productos</h1>
      </div>

      {loading ? (
        <p className="py-16 text-center text-slate-400">Cargando productos...</p>
      ) : products.length === 0 ? (
        <p className="py-16 text-center text-slate-400">No hay productos para mostrar.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isAdmin={isAdmin}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() => setPage((current) => Math.max(current - 1, 0))}
          disabled={page === 0}
          className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm text-slate-500">Página {page + 1}</span>
        <button
          onClick={() => setPage((current) => current + 1)}
          disabled={products.length < PAGE_SIZE}
          className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
