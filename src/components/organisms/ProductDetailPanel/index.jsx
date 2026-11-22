import formatRupiah from '../../../utils/formatRupiah.js'

export default function ProductDetailPanel({ product }) {
  return (
    <article className="product-detail-card">
      <p className="product-id">ID: {product.id}</p>
      <h2>{product.name}</h2>
      <p className="product-detail-label">Harga</p>
      <p className="product-detail-price">{formatRupiah(product.price)}</p>
    </article>
  )
}
