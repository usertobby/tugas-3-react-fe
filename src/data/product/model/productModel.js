export default class ProductModel {
  constructor({ id, name, price }) {
    this.id = id
    this.name = name
    this.price = price
  }

  toJSON() {
    return { id: this.id, name: this.name, price: this.price }
  }

  static fromResponse(data) {
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      throw new TypeError('Format produk dari API tidak valid.')
    }

    const { id, name, price } = data

    if (
      !Number.isSafeInteger(id) ||
      id <= 0 ||
      typeof name !== 'string' ||
      !name.trim() ||
      typeof price !== 'number' ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      throw new TypeError('Format produk dari API tidak valid.')
    }

    return new ProductModel({ id, name: name.trim(), price })
  }
}
