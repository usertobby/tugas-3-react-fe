import Button from '../../atoms/Button/index.jsx'
import formatRupiah from '../../../utils/formatRupiah.js'

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="product-card">
      <p className="product-id">ID: {product.id}</p>
      <h3>{product.name}</h3>
      <p className="product-price">{formatRupiah(product.price)}</p>
      <div className="product-actions">
        <Button variant="secondary" onClick={() => onEdit(product)}>
          Edit
        </Button>
        <Button variant="danger-outline" onClick={() => onDelete(product)}>
          Hapus
        </Button>
      </div>
    </article>
  )
}
