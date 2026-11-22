const PRODUCTS_ENDPOINT = '/api/products'

export default function ProductRemote({ fetchImpl = fetch } = {}) {
  async function request(endpoint = '', options = {}) {
    let response

    try {
      response = await fetchImpl(`${PRODUCTS_ENDPOINT}${endpoint}`, {
        ...options,
        headers: {
          Accept: 'application/json',
          ...(options.body ? { 'Content-Type': 'application/json' } : {}),
          ...options.headers,
        },
      })
    } catch {
      throw new Error(
        'Tidak dapat terhubung ke API produk. Pastikan backend berjalan di port 3000.',
      )
    }

    const responseBody = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(
        responseBody?.message || `Permintaan gagal (HTTP ${response.status}).`,
      )
    }

    return responseBody
  }

  async function getProductsRemote() {
    return request()
  }

  async function getProductByIdRemote(id) {
    return request(`/${id}`)
  }

  async function createProductRemote(product) {
    return request('', {
      method: 'POST',
      body: JSON.stringify(product),
    })
  }

  async function updateProductRemote(product) {
    return request('', {
      method: 'PUT',
      body: JSON.stringify(product),
    })
  }

  async function deleteProductRemote(id) {
    return request(`/${id}`, { method: 'DELETE' })
  }

  return {
    getProductsRemote,
    getProductByIdRemote,
    createProductRemote,
    updateProductRemote,
    deleteProductRemote,
  }
}
