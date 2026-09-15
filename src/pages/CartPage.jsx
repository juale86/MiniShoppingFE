import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'USD',
})

export function CartPage() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)

  const subtotal = getTotalPrice()
  const shipping = subtotal > 0 ? 0 : 0 // Free shipping
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Tu carrito está vacío</h1>
          <p className="mt-4 text-slate-500">Agrega productos para comenzar</p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-2.5 text-white font-medium hover:bg-indigo-500"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-semibold text-slate-900">Carrito de compras</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Product list */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              {/* Image */}
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
                {item.images?.[0] ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                    Sin imagen
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col">
                <h3 className="font-medium text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-indigo-600 font-semibold">
                  {currencyFormatter.format(item.price)}
                </p>

                {/* Quantity controls */}
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="rounded-md bg-slate-100 px-2 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="rounded-md bg-slate-100 px-2 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Subtotal and delete */}
              <div className="flex flex-col items-end justify-between">
                <p className="text-sm font-semibold text-slate-900">
                  {currencyFormatter.format(item.price * item.quantity)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sticky top-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Resumen del pedido</h2>

            <div className="space-y-3 border-b border-slate-200 pb-4 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-medium text-slate-900">
                  {currencyFormatter.format(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Envío</span>
                <span className="font-medium text-slate-900">
                  {shipping === 0 ? 'Gratis' : currencyFormatter.format(shipping)}
                </span>
              </div>
            </div>

            <div className="mb-6 flex justify-between">
              <span className="font-semibold text-slate-900">Total</span>
              <span className="text-xl font-bold text-indigo-600">
                {currencyFormatter.format(total)}
              </span>
            </div>

            <button className="w-full rounded-md bg-indigo-600 px-4 py-2.5 font-medium text-white hover:bg-indigo-500 mb-3">
              Ir al checkout
            </button>

            <button
              onClick={clearCart}
              className="w-full rounded-md border border-slate-300 px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-50 mb-4"
            >
              Limpiar carrito
            </button>

            <Link
              to="/"
              className="block text-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
