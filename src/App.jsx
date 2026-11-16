import { useState } from 'react'
import './App.css'

const initialProducts = [
  { id: 1, name: 'Pulpen', price: 5000 },
  { id: 2, name: 'Buku Tulis', price: 12000 },
  { id: 3, name: 'Spidol', price: 8000 },
  { id: 4, name: 'Penggaris', price: 6000 },
  { id: 5, name: 'Penghapus', price: 3000 },
]

const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [formValues, setFormValues] = useState({ name: '', price: '' })

  const closeAddDialog = () => {
    setIsAddDialogOpen(false)
    setFormValues({ name: '', price: '' })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const name = formValues.name.trim()
    const price = Number(formValues.price)

    if (!name || !Number.isFinite(price) || price <= 0) return

    const nextId = products.reduce(
      (highestId, product) => Math.max(highestId, product.id),
      0,
    ) + 1

    setProducts((currentProducts) => [
      ...currentProducts,
      { id: nextId, name, price },
    ])
    closeAddDialog()
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Katalog</p>
          <h1>Manajemen Produk</h1>
          <p className="page-description">
            Kelola daftar produk dan harga dalam satu tempat.
          </p>
        </div>
        <button
          className="button button-primary add-product-button"
          type="button"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <span aria-hidden="true">＋</span> Tambah Produk
        </button>
      </header>

      <section className="product-section" aria-label="Daftar produk">
        <div className="section-heading">
          <h2>Daftar Produk</h2>
          <span className="product-count">{products.length} produk</span>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <p className="product-id">ID: {product.id}</p>
              <h3>{product.name}</h3>
              <p className="product-price">{formatPrice(product.price)}</p>
            </article>
          ))}
        </div>
      </section>

      {isAddDialogOpen && (
        <div className="modal-backdrop">
          <section
            className="product-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-dialog-title"
          >
            <button
              className="dialog-close"
              type="button"
              aria-label="Tutup dialog"
              onClick={closeAddDialog}
            >
              ×
            </button>
            <h2 id="add-dialog-title">Tambah Produk</h2>
            <p className="dialog-description">
              Masukkan informasi produk baru.
            </p>

            <form className="product-form" onSubmit={handleSubmit}>
              <label htmlFor="new-product-name">Nama Produk</label>
              <input
                id="new-product-name"
                name="name"
                type="text"
                placeholder="Contoh: Pulpen"
                value={formValues.name}
                onChange={(event) =>
                  setFormValues({ ...formValues, name: event.target.value })
                }
                required
              />

              <label htmlFor="new-product-price">Harga (Rp)</label>
              <input
                id="new-product-price"
                name="price"
                type="number"
                min="1"
                step="1"
                placeholder="Contoh: 5000"
                value={formValues.price}
                onChange={(event) =>
                  setFormValues({ ...formValues, price: event.target.value })
                }
                required
              />
              <p className="field-hint">Harga harus lebih dari 0.</p>

              <div className="dialog-actions">
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={closeAddDialog}
                >
                  Batal
                </button>
                <button className="button button-primary" type="submit">
                  Simpan Produk
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
