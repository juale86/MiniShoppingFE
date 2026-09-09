import { Link } from 'react-router-dom'

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'USD',
})

export function ProductCard({ product, isAdmin, onDelete }) {
  const image = product.images?.[0]

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md">
      <div className="aspect-square overflow-hidden bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
            Sin imagen
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="truncate text-sm font-medium text-slate-900">{product.title}</h3>
        <p className="mt-1 text-sm font-semibold text-indigo-600">
          {currencyFormatter.format(product.price ?? 0)}
        </p>
        <p className="mt-1 text-xs text-slate-400">Stock: {product.stock ?? 0}</p>

        {isAdmin && (
          <div className="mt-3 flex gap-2">
            <Link
              to={`/products/${product.id}/edit`}
              className="flex-1 rounded-md bg-slate-100 px-2 py-1.5 text-center text-xs font-medium text-slate-700 hover:bg-slate-200"
            >
              Editar
            </Link>
            <button
              onClick={() => onDelete(product)}
              className="flex-1 rounded-md bg-red-50 px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
