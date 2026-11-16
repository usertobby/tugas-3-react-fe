import './App.css'

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

      <section className="content-panel" aria-label="Daftar produk">
        <div className="empty-state">
          <span className="empty-state-icon" aria-hidden="true">
            □
          </span>
          <h2>Daftar produk akan muncul di sini</h2>
          <p>Produk dapat dikelola dari halaman ini.</p>
        </div>
      </section>
    </main>
  )
}

export default App
