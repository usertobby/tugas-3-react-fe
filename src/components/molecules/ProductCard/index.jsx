import { Link } from 'react-router'
import Button from '../../atoms/Button/index.jsx'
import formatRupiah from '../../../utils/formatRupiah.js'

export default function ProductCard({ product, onDelete }) {
  return (
    <article className="product-card">
      <p className="product-id">ID: {product.id}</p>
      <h3>{product.name}</h3>
      <p className="product-price">{formatRupiah(product.price)}</p>
      <div className="product-actions">
        <Link
          className="button button-primary product-detail-link"
          to={`/products/${product.id}`}
          aria-label={`Lihat detail ${product.name}`}
        >
          Detail
        </Link>
        <Button variant="danger-outline" onClick={() => onDelete(product)}>
          Hapus
        </Button>
      </div>
    </article>
  )
}
