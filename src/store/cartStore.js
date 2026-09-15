import { create } from 'zustand'

export const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('cart') || '[]'),

  addItem: (product, quantity = 1) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id)

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        }
      }

      const newItems = [
        ...state.items,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          images: product.images,
          quantity,
        },
      ]

      localStorage.setItem('cart', JSON.stringify(newItems))
      return { items: newItems }
    }),

  removeItem: (productId) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(newItems))
      return { items: newItems }
    }),

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }

    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )

      localStorage.setItem('cart', JSON.stringify(newItems))
      return { items: newItems }
    })
  },

  clearCart: () => {
    localStorage.removeItem('cart')
    set({ items: [] })
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },
}))
