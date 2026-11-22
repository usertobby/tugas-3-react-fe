import ProductModel from '../model/productModel.js'

export default function ProductRepository({
  getProductsRemote,
  getProductByIdRemote,
  createProductRemote,
  updateProductRemote,
  deleteProductRemote,
}) {
  async function getProducts() {
    const response = await getProductsRemote()

    if (!Array.isArray(response)) {
      throw new TypeError('API harus mengembalikan daftar produk berbentuk array.')
    }

    const products = response.map((item) => ProductModel.fromResponse(item))
    const ids = products.map((product) => product.toJSON().id)

    if (new Set(ids).size !== ids.length) {
      throw new TypeError('ID produk dari API harus unik.')
    }

    return products.map((product) => product.toJSON())
  }

  async function getProductById(id) {
    const response = await getProductByIdRemote(id)
    return ProductModel.fromResponse(response).toJSON()
  }

  async function createProduct(product) {
    const response = await createProductRemote(product)
    return ProductModel.fromResponse(response).toJSON()
  }

  async function updateProduct(product) {
    const response = await updateProductRemote(product)
    return ProductModel.fromResponse(response).toJSON()
  }

  async function deleteProduct(id) {
    return deleteProductRemote(id)
  }

  return {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
