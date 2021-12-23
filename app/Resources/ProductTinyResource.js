class ProductTinyResource {
  model;

  constructor(row) {
    this.model = row;
  }

  toArray() {
    return {
      id: this.model.id,
      title: this.model.title,
      category_id: this.model.category_id,
      price: this.model.price,
      image: this.model.image,
    }
  }
}

module.exports = ProductTinyResource
