import Button from '../../atoms/Button/index.jsx'

const dialogCopy = {
  create: {
    title: 'Tambah Produk',
    description: 'Masukkan informasi produk baru.',
    submit: 'Simpan Produk',
    submitting: 'Menyimpan...',
  },
  edit: {
    title: 'Edit Produk',
    description: 'Perbarui informasi produk yang dipilih.',
    submit: 'Simpan Perubahan',
    submitting: 'Menyimpan...',
  },
}

export default function ProductFormDialog({
  mode,
  product,
  values,
  error,
  isSubmitting,
  onChange,
  onClose,
  onSubmit,
}) {
  if (!mode) return null

  const copy = dialogCopy[mode]
  const nameId = `${mode}-product-name`
  const priceId = `${mode}-product-price`

  return (
    <div
      className="modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="product-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${mode}-dialog-title`}
      >
        <button
          className="dialog-close"
          type="button"
          aria-label="Tutup dialog"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 id={`${mode}-dialog-title`}>{copy.title}</h2>
        <p className="dialog-description">{copy.description}</p>
        {product && <p className="dialog-product-id">ID: {product.id}</p>}

        <form className="product-form" onSubmit={onSubmit}>
          <label htmlFor={nameId}>Nama Produk</label>
          <input
            id={nameId}
            name="name"
            type="text"
            placeholder={mode === 'create' ? 'Contoh: Pulpen' : undefined}
            value={values.name}
            onChange={onChange}
            required
          />

          <label htmlFor={priceId}>Harga (Rp)</label>
          <input
            id={priceId}
            name="price"
            type="number"
            min="1"
            step="1"
            placeholder={mode === 'create' ? 'Contoh: 5000' : undefined}
            value={values.price}
            onChange={onChange}
            required
          />
          <p className="field-hint">Harga harus lebih dari 0.</p>
          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="dialog-actions">
            <Button variant="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? copy.submitting : copy.submit}
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}
