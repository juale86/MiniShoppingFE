import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import tesloApi from '../api/tesloApi'
import { ImageUploader } from '../components/ImageUploader'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const GENDERS = ['men', 'women', 'kid', 'unisex']

const emptyForm = {
  title: '',
  price: '',
  description: '',
  stock: '',
  gender: 'unisex',
  sizes: [],
  tags: '',
  images: [],
}

export function ProductFormPage() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEditing) return

    tesloApi
      .get(`/products/${id}`)
      .then(({ data }) => {
        setForm({
          title: data.title ?? '',
          price: data.price ?? '',
          description: data.description ?? '',
          stock: data.stock ?? '',
          gender: data.gender ?? 'unisex',
          sizes: data.sizes ?? [],
          tags: (data.tags ?? []).join(', '),
          images: data.images ?? [],
        })
      })
      .catch(() => toast.error('No se pudo cargar el producto'))
      .finally(() => setLoading(false))
  }, [id, isEditing])

  const onChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const toggleSize = (size) => {
    setForm((current) => ({
      ...current,
      sizes: current.sizes.includes(size)
        ? current.sizes.filter((item) => item !== size)
        : [...current.sizes, size],
    }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    if (form.sizes.length === 0) {
      toast.error('Selecciona al menos una talla')
      return
    }

    const payload = {
      title: form.title,
      price: form.price === '' ? undefined : Number(form.price),
      description: form.description || undefined,
      stock: form.stock === '' ? undefined : Number(form.stock),
      gender: form.gender,
      sizes: form.sizes,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      images: form.images,
    }

    setSaving(true)
    try {
      if (isEditing) {
        await tesloApi.patch(`/products/${id}`, payload)
        toast.success('Producto actualizado')
      } else {
        await tesloApi.post('/products', payload)
        toast.success('Producto creado')
      }
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'No se pudo guardar el producto')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="py-16 text-center text-slate-400">Cargando producto...</p>
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold text-slate-900">
        {isEditing ? 'Editar producto' : 'Nuevo producto'}
      </h1>

      <form onSubmit={onSubmit} className="space-y-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Título</label>
            <input
              type="text"
              name="title"
              required
              minLength={1}
              value={form.title}
              onChange={onChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Precio</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={form.price}
              onChange={onChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Stock</label>
            <input
              type="number"
              name="stock"
              min="0"
              step="1"
              value={form.stock}
              onChange={onChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Descripción</label>
            <textarea
              name="description"
              rows={3}
              value={form.description}
              onChange={onChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Género</label>
            <select
              name="gender"
              value={form.gender}
              onChange={onChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {GENDERS.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Etiquetas (separadas por coma)
            </label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={onChange}
              placeholder="verano, casual"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Tallas</label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                    form.sizes.includes(size)
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-300 text-slate-600 hover:border-indigo-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ImageUploader images={form.images} onChange={(images) => setForm({ ...form, images })} />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear producto'}
          </button>
        </div>
      </form>
    </div>
  )
}
