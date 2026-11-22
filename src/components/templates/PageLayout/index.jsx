import { useState } from 'react'
import { Link, Outlet } from 'react-router'
import ikeaLogo from '../../../assets/ikea-logo.jpg'

export default function PageLayout() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <main className="page-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="IKIYO beranda">
          <img className="brand-logo" src={ikeaLogo} alt="" />
          <span>IKIYO</span>
        </Link>

        <label className="topbar-search">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.2 4.2" />
          </svg>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Cari barang favoritmu..."
            aria-label="Cari nama produk"
          />
          {searchTerm && (
            <button
              className="clear-search-button"
              type="button"
              aria-label="Hapus pencarian"
              onClick={() => setSearchTerm('')}
            >
              &times;
            </button>
          )}
        </label>
      </header>

      <Outlet context={{ searchTerm }} />
    </main>
  )
}
