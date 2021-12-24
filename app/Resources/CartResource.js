const Transformers = use('App/Helpers/Transformers');
const dateFormat = require("dateformat");

class CartResource {
  model;

  constructor(row) {
    this.model = row;
  }

  toArray() {
    return {
      type: 'cart',
      id: this.model.id,
      attributes: {
        id: this.model.id,
        product_id: this.model.product_id,
        created_by: this.model.created_by,
        quantity: this.model.quantity,
        created_at: dateFormat(new Date(this.model.created_at), "yyyy-mm-dd hh:MM:ss tt"),
        updated_at: dateFormat(new Date(this.model.updated_at), "yyyy-mm-dd hh:MM:ss tt"),
      },
      relationships: {
        product: Transformers.resource(this.model.hasOwnProperty('product') ? this.model.product : {}, 'ProductTinyResource'),
      },
    };
  }
}

module.exports = CartResource
