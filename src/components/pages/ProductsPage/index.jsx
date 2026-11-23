import { useCallback, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router'
import Button from '../../atoms/Button/index.jsx'
import DeleteProductDialog from '../../organisms/DeleteProductDialog/index.jsx'
import ProductFormDialog from '../../organisms/ProductFormDialog/index.jsx'
import ProductGrid from '../../organisms/ProductGrid/index.jsx'
import ProductViewSettings from '../../molecules/ProductViewSettings/index.jsx'
import ProductRemote from '../../../data/product/source/productRemote.js'
import ProductRepository from '../../../data/product/repository/productRepository.js'

const repository = ProductRepository(ProductRemote())

function getErrorMessage(error, fallback) {
  return error instanceof Error ? error.message : fallback
}

function getSavedViewMode() {
  try {
    const savedViewMode = window.localStorage.getItem('ikiyo-product-view')
    return savedViewMode === 'list' ? 'list' : 'grid'
  } catch {
    return 'grid'
  }
}

export default function ProductsPage() {
  const { searchTerm } = useOutletContext()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [deletingProduct, setDeletingProduct] = useState(null)
  const [formValues, setFormValues] = useState({ name: '', price: '' })
  const [formError, setFormError] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [viewMode, setViewMode] = useState(getSavedViewMode)

  useEffect(() => {
    try {
      window.localStorage.setItem('ikiyo-product-view', viewMode)
    } catch {
      // Preferensi tampilan tetap bisa digunakan selama sesi ini.
    }
  }, [viewMode])

  const loadProducts = useCallback(async () => {
    setIsLoading(true)
    setLoadError('')

    try {
      setProducts(await repository.getProducts())
    } catch (error) {
      setLoadError(getErrorMessage(error, 'Produk gagal dimuat.'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadProducts()
  }, [loadProducts])

  useEffect(() => {
    const hasOpenDialog = isAddDialogOpen || deletingProduct
    if (!hasOpenDialog) return

    const handleEscape = (event) => {
      if (event.key !== 'Escape') return
      setIsAddDialogOpen(false)
      setDeletingProduct(null)
      setFormValues({ name: '', price: '' })
      setFormError('')
      setDeleteError('')
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isAddDialogOpen, deletingProduct])

  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase('id-ID')
  const visibleProducts = products.filter((product) =>
    product.name.toLocaleLowerCase('id-ID').includes(normalizedSearchTerm),
  )

  function closeAddDialog() {
    setIsAddDialogOpen(false)
    setFormValues({ name: '', price: '' })
    setFormError('')
  }

  function openAddDialog() {
    setFormValues({ name: '', price: '' })
    setFormError('')
    setIsAddDialogOpen(true)
  }

  function openDeleteDialog(product) {
    setDeletingProduct(product)
    setDeleteError('')
  }

  function closeDeleteDialog() {
    setDeletingProduct(null)
    setDeleteError('')
  }

  function handleFormChange(event) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }))
  }

  async function handleCreate(event) {
    event.preventDefault()
    const name = formValues.name.trim()
    const price = Number(formValues.price)

    if (!name || !Number.isFinite(price) || price <= 0) {
      setFormError('Masukkan nama produk dan harga lebih dari 0.')
      return
    }

    setIsSubmitting(true)
    setFormError('')

    try {
      const createdProduct = await repository.createProduct({ name, price })
      setProducts((currentProducts) => [...currentProducts, createdProduct])
      closeAddDialog()
    } catch (error) {
      setFormError(getErrorMessage(error, 'Produk gagal ditambahkan.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!deletingProduct) return

    setIsDeleting(true)
    setDeleteError('')

    try {
      await repository.deleteProduct(deletingProduct.id)
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== deletingProduct.id),
      )
      closeDeleteDialog()
    } catch (error) {
      setDeleteError(getErrorMessage(error, 'Produk gagal dihapus.'))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section className="product-section" aria-label="Daftar produk">
      <div className="management-header">
        <div>
          <p className="eyebrow">Pusat kendali toko</p>
          <h1>Manajemen Produk</h1>
          <p className="page-description">
            Semua produk tertata, harga pun jelas.
          </p>
        </div>
        <Button className="add-product-button" onClick={openAddDialog}>
          <span aria-hidden="true">+</span> Tambah Produk
        </Button>
      </div>

      <div className="section-heading">
        <h2>Daftar Produk</h2>
        <div className="product-list-controls">
          <span className="product-count" aria-live="polite">
            Menampilkan {visibleProducts.length} dari {products.length} produk
          </span>
          <ProductViewSettings viewMode={viewMode} onChange={setViewMode} />
        </div>
      </div>

      {isLoading ? (
        <p className="product-empty-state" role="status">
          Memuat produk dari server...
        </p>
      ) : loadError ? (
        <div className="product-empty-state product-load-error" role="alert">
          <p>Produk gagal dimuat: {loadError}</p>
          <Button variant="secondary" onClick={loadProducts}>
            Coba Lagi
          </Button>
        </div>
      ) : visibleProducts.length > 0 ? (
        <ProductGrid
          products={visibleProducts}
          onDelete={openDeleteDialog}
          viewMode={viewMode}
        />
      ) : (
        <p className="product-empty-state" role="status">
          {products.length === 0
            ? 'Belum ada produk.'
            : `Produk dengan nama "${searchTerm.trim()}" tidak ditemukan.`}
        </p>
      )}

      <ProductFormDialog
        mode={isAddDialogOpen ? 'create' : null}
        product={null}
        values={formValues}
        error={formError}
        isSubmitting={isSubmitting}
        onChange={handleFormChange}
        onClose={closeAddDialog}
        onSubmit={handleCreate}
      />
      <DeleteProductDialog
        product={deletingProduct}
        error={deleteError}
        isDeleting={isDeleting}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
      />
    </section>
  )
}
