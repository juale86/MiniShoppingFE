import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ProductCard } from '../src/components/ProductCard'
import * as cartStoreModule from '../src/store/cartStore'

vi.mock('../src/store/cartStore')

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    stock: 10,
    images: ['https://example.com/image.jpg'],
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  it('should render product info correctly', () => {
    const mockAddItem = vi.fn()
    vi.mocked(cartStoreModule.useCartStore).mockImplementation((selector) => {
      return selector({ addItem: mockAddItem })
    })

    renderWithRouter(<ProductCard product={mockProduct} isAdmin={false} onDelete={vi.fn()} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText(/99[.,]99/)).toBeInTheDocument()
    expect(screen.getByText('Stock: 10')).toBeInTheDocument()
  })

  it('should show add to cart button for non-admin', () => {
    const mockAddItem = vi.fn()
    vi.mocked(cartStoreModule.useCartStore).mockImplementation((selector) => {
      return selector({ addItem: mockAddItem })
    })

    renderWithRouter(<ProductCard product={mockProduct} isAdmin={false} onDelete={vi.fn()} />)

    const button = screen.getByText('Agregar al carrito')
    expect(button).toBeInTheDocument()
  })

  it('should show edit and delete buttons for admin', () => {
    const mockAddItem = vi.fn()
    vi.mocked(cartStoreModule.useCartStore).mockImplementation((selector) => {
      return selector({ addItem: mockAddItem })
    })

    renderWithRouter(<ProductCard product={mockProduct} isAdmin={true} onDelete={vi.fn()} />)

    expect(screen.getByText('Editar')).toBeInTheDocument()
    expect(screen.getByText('Eliminar')).toBeInTheDocument()
  })

  it('should display product image', () => {
    const mockAddItem = vi.fn()
    vi.mocked(cartStoreModule.useCartStore).mockImplementation((selector) => {
      return selector({ addItem: mockAddItem })
    })

    renderWithRouter(<ProductCard product={mockProduct} isAdmin={false} onDelete={vi.fn()} />)

    const image = screen.getByAltText('Test Product')
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('should show placeholder when no image', () => {
    const mockAddItem = vi.fn()
    vi.mocked(cartStoreModule.useCartStore).mockImplementation((selector) => {
      return selector({ addItem: mockAddItem })
    })

    const productWithoutImage = { ...mockProduct, images: [] }
    renderWithRouter(
      <ProductCard product={productWithoutImage} isAdmin={false} onDelete={vi.fn()} />
    )

    expect(screen.getByText('Sin imagen')).toBeInTheDocument()
  })
})
