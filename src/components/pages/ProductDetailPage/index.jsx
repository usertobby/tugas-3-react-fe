import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import ProductFormDialog from '../../organisms/ProductFormDialog/index.jsx'
import DeleteProductDialog from '../../organisms/DeleteProductDialog/index.jsx'
import ProductDetailPanel from '../../organisms/ProductDetailPanel/index.jsx'
import ProductRemote from '../../../data/product/source/productRemote.js'
import ProductRepository from '../../../data/product/repository/productRepository.js'

const repository = ProductRepository(ProductRemote())

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [formValues, setFormValues] = useState({ name: '', price: '' })
  const [formError, setFormError] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!isEditDialogOpen && !isDeleteDialogOpen) return

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsEditDialogOpen(false)
        setIsDeleteDialogOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isEditDialogOpen, isDeleteDialogOpen])

  useEffect(() => {
    let isActive = true
    setProduct(null)
    setError('')

    if (!id || !/^\d+$/.test(id)) {
      setStatus('not-found')
      return () => {
        isActive = false
      }
    }

    setStatus('loading')
    repository
      .getProductById(id)
      .then((result) => {
        if (!isActive) return
        setProduct(result)
        setStatus('success')
      })
      .catch((requestError) => {
        if (!isActive) return

        if (requestError instanceof Error && requestError.message === 'Produk tidak ditemukan') {
          setStatus('not-found')
        } else {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Detail produk gagal dimuat.',
          )
          setStatus('error')
        }
      })

    return () => {
      isActive = false
    }
  }, [id])

  function openEditDialog() {
    if (!product) return
    setFormValues({ name: product.name, price: String(product.price) })
    setFormError('')
    setIsEditDialogOpen(true)
  }

  function handleFormChange(event) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }))
  }

  async function handleUpdate(event) {
    event.preventDefault()
    const name = formValues.name.trim()
    const price = Number(formValues.price)

    if (!product || !name || !Number.isFinite(price) || price <= 0) {
      setFormError('Masukkan nama produk dan harga lebih dari 0.')
      return
    }

    setIsSubmitting(true)
    setFormError('')
    try {
      const updatedProduct = await repository.updateProduct({
        id: product.id,
        name,
        price,
      })
      setProduct(updatedProduct)
      setIsEditDialogOpen(false)
    } catch (requestError) {
      setFormError(
        requestError instanceof Error
          ? requestError.message
          : 'Produk gagal diperbarui.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!product) return

    setIsDeleting(true)
    setDeleteError('')
    try {
      await repository.deleteProduct(product.id)
      navigate('/')
    } catch (requestError) {
      setDeleteError(
        requestError instanceof Error
          ? requestError.message
          : 'Produk gagal dihapus.',
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section className="product-section product-detail-page">
      <Link className="detail-back-link" to="/">
        &larr; Kembali ke daftar produk
      </Link>
      <p className="eyebrow">Katalog</p>
      <h1>Detail Produk</h1>

      {status === 'loading' && (
        <p className="product-empty-state" role="status">
          Memuat detail produk...
        </p>
      )}

      {status === 'not-found' && (
        <div className="product-empty-state" role="status">
          <h2>Produk tidak ditemukan</h2>
          <p>Produk dengan ID {id} tidak tersedia.</p>
        </div>
      )}

      {status === 'error' && (
        <p className="product-empty-state" role="alert">
          Detail produk gagal dimuat: {error}
        </p>
      )}

      {status === 'success' && product && (
        <ProductDetailPanel
          product={product}
          onEdit={openEditDialog}
          onDelete={() => {
            setDeleteError('')
            setIsDeleteDialogOpen(true)
          }}
        />
      )}

      <ProductFormDialog
        mode={isEditDialogOpen ? 'edit' : null}
        product={product}
        values={formValues}
        error={formError}
        isSubmitting={isSubmitting}
        onChange={handleFormChange}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleUpdate}
      />
      <DeleteProductDialog
        product={isDeleteDialogOpen ? product : null}
        error={deleteError}
        isDeleting={isDeleting}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  )
}
