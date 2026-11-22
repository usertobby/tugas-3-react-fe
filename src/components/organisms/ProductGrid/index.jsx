import ProductCard from '../../molecules/ProductCard/index.jsx'

export default function ProductGrid({ products, onEdit, onDelete }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
