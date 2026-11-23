import formatRupiah from '../../../utils/formatRupiah.js'
import Button from '../../atoms/Button/index.jsx'

export default function ProductDetailPanel({ product, onEdit, onDelete }) {
  return (
    <article className="product-detail-card">
      <p className="product-id">ID: {product.id}</p>
      <h2>{product.name}</h2>
      <p className="product-detail-label">Harga</p>
      <p className="product-detail-price">{formatRupiah(product.price)}</p>
      <div className="product-detail-actions">
        <Button variant="secondary" onClick={onEdit}>
          Edit Produk
        </Button>
        <Button variant="danger-outline" onClick={onDelete}>
          Hapus Produk
        </Button>
      </div>
    </article>
  )
}
