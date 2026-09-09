import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import tesloApi from '../api/tesloApi'

export function ImageUploader({ images, onChange }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)

  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await tesloApi.post('/files/upload', formData)
    return data.secureUrl
  }

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList).filter((file) => file.type.startsWith('image/'))
    if (files.length === 0) return

    setUploading(true)
    try {
      const uploaded = await Promise.all(files.map(uploadFile))
      onChange([...images, ...uploaded])
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'No se pudo subir la imagen')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const removeImage = (url) => {
    onChange(images.filter((image) => image !== url))
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">Imágenes</label>

      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          handleFiles(event.dataTransfer.files)
        }}
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500 hover:border-indigo-400 hover:bg-indigo-50/40"
      >
        {uploading ? 'Subiendo...' : 'Arrastra imágenes aquí o haz clic para elegirlas'}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </div>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((url) => (
            <div key={url} className="group relative aspect-square overflow-hidden rounded-md ring-1 ring-slate-200">
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute right-1 top-1 hidden h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white group-hover:flex"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
