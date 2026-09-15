import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '../src/store/cartStore'

describe('cartStore', () => {
  beforeEach(() => {
    // Reset del store antes de cada test
    useCartStore.setState({ items: [] })
  })

  it('should initialize with empty cart', () => {
    const items = useCartStore.getState().items
    expect(items).toEqual([])
  })

  it('should add item to cart', () => {
    const product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      images: ['image.jpg'],
    }

    const { addItem } = useCartStore.getState()
    addItem(product, 1)

    const items = useCartStore.getState().items
    expect(items).toHaveLength(1)
    expect(items[0].id).toBe(1)
    expect(items[0].quantity).toBe(1)
  })

  it('should merge quantity when adding same product twice', () => {
    const product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      images: ['image.jpg'],
    }

    const { addItem } = useCartStore.getState()
    addItem(product, 1)
    addItem(product, 2)

    const items = useCartStore.getState().items
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(3)
  })

  it('should remove item from cart', () => {
    const product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      images: ['image.jpg'],
    }

    const { addItem, removeItem } = useCartStore.getState()
    addItem(product, 1)
    removeItem(1)

    const items = useCartStore.getState().items
    expect(items).toHaveLength(0)
  })

  it('should update item quantity', () => {
    const product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      images: ['image.jpg'],
    }

    const { addItem, updateQuantity } = useCartStore.getState()
    addItem(product, 1)
    updateQuantity(1, 5)

    const items = useCartStore.getState().items
    expect(items[0].quantity).toBe(5)
  })

  it('should remove item when quantity is 0 or less', () => {
    const product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      images: ['image.jpg'],
    }

    const { addItem, updateQuantity } = useCartStore.getState()
    addItem(product, 1)
    updateQuantity(1, 0)

    const items = useCartStore.getState().items
    expect(items).toHaveLength(0)
  })

  it('should calculate total price correctly', () => {
    const { addItem, getTotalPrice } = useCartStore.getState()
    addItem({ id: 1, title: 'Product 1', price: 100, images: [] }, 2)
    addItem({ id: 2, title: 'Product 2', price: 50, images: [] }, 3)

    const total = getTotalPrice()
    expect(total).toBe(350) // (100 * 2) + (50 * 3)
  })

  it('should calculate total items correctly', () => {
    const { addItem, getTotalItems } = useCartStore.getState()
    addItem({ id: 1, title: 'Product 1', price: 100, images: [] }, 2)
    addItem({ id: 2, title: 'Product 2', price: 50, images: [] }, 3)

    const total = getTotalItems()
    expect(total).toBe(5)
  })

  it('should clear cart', () => {
    const { addItem, clearCart } = useCartStore.getState()
    addItem({ id: 1, title: 'Product 1', price: 100, images: [] }, 2)
    clearCart()

    const items = useCartStore.getState().items
    expect(items).toHaveLength(0)
  })
})
