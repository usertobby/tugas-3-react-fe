import ProductCard from '../../molecules/ProductCard/index.jsx'

export default function ProductGrid({ products, onDelete, viewMode }) {
  return (
    <div className={`product-grid product-grid--${viewMode}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
