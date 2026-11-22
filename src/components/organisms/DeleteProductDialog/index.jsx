import Button from '../../atoms/Button/index.jsx'
import formatRupiah from '../../../utils/formatRupiah.js'

export default function DeleteProductDialog({
  product,
  error,
  isDeleting,
  onClose,
  onConfirm,
}) {
  if (!product) return null

  return (
    <div
      className="modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="product-dialog delete-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <button
          className="dialog-close"
          type="button"
          aria-label="Tutup dialog"
          onClick={onClose}
        >
          &times;
        </button>
        <span className="delete-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M8 6V4h8v2m3 0-.9 14H5.9L5 6m4 4v6m6-6v6" />
          </svg>
        </span>
        <h2 id="delete-dialog-title">Hapus Produk?</h2>
        <p className="dialog-description" id="delete-dialog-description">
          Produk yang dihapus tidak dapat dikembalikan.
        </p>

        <div className="delete-product-preview">
          <p className="product-id">ID: {product.id}</p>
          <h3>{product.name}</h3>
          <p className="product-price">{formatRupiah(product.price)}</p>
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}

        <div className="dialog-actions">
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Menghapus...' : 'Hapus Produk'}
          </Button>
        </div>
      </section>
    </div>
  )
}
