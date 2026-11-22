import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <p className="not-found-code" aria-hidden="true">
        404
      </p>
      <p className="eyebrow">Halaman tidak tersedia</p>
      <h1 id="not-found-title">Sepertinya kamu tersesat.</h1>
      <p className="not-found-description">
        Halaman yang kamu cari tidak ditemukan atau alamatnya sudah berubah.
      </p>
      <Link className="button not-found-home-link" to="/">
        Kembali ke daftar produk
      </Link>
    </section>
  )
}
