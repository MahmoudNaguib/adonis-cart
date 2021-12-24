const Transformers = use('App/Helpers/Transformers');
const dateFormat = require("dateformat");

class OrderResource {
  model;

  constructor(row) {
    this.model = row;
  }

  toArray() {
    return {
      type: 'orders',
      id: this.model.id,
      attributes: {
        id: this.model.id,
        address_id: this.model.address_id,
        full_address: this.model.full_address,
        contact_name: this.model.contact_name,
        contact_mobile: this.model.contact_mobile,
        products: JSON.parse(this.model.products),
        total: this.model.total,
        status: this.model.status,
        created_by: this.model.created_by,
        created_at: dateFormat(new Date(this.model.created_at), "yyyy-mm-dd hh:MM:ss tt"),
        updated_at: dateFormat(new Date(this.model.updated_at), "yyyy-mm-dd hh:MM:ss tt"),
      },
      relationships: {
        creator: Transformers.resource(this.model.hasOwnProperty('creator') ? this.model.creator : {}, 'UserTinyResource'),
      },
    };
  }
}

module.exports = OrderResource
