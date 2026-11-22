import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import ProductDetailPanel from '../../organisms/ProductDetailPanel/index.jsx'
import ProductRemote from '../../../data/product/source/productRemote.js'
import ProductRepository from '../../../data/product/repository/productRepository.js'

const repository = ProductRepository(ProductRemote())

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

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
        <ProductDetailPanel product={product} />
      )}
    </section>
  )
}
