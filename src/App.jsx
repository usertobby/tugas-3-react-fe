import './App.css'

const products = [
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
    </main>
  )
}

export default App
