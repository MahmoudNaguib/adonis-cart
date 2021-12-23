const Transformers = use('App/Helpers/Transformers');
const dateFormat = require("dateformat");

class ProductResource {
  model;

  constructor(row) {
    this.model = row;
  }

  toArray() {
    return {
      type: 'products',
      id: this.model.id,
      attributes: {
        id: this.model.id,
        category_id: this.model.category_id,
        title: this.model.title,
        content: this.model.content,
        price: this.model.price,
        image: this.model.image,
        meta_keywords: this.model.meta_keywords,
        meta_description: this.model.meta_description,
        is_active: this.model.is_active,
        created_by:this.model.created_by,
        created_at: dateFormat(this.model.created_at, "yyyy-mm-dd hh:MM:ss tt"),
        updated_at: dateFormat(new Date(this.model.updated_at), "yyyy-mm-dd hh:MM:ss tt"),
      },
      relationships: {
        creator: Transformers.resource(this.model.creator, 'UserTinyResource'),
        category: Transformers.resource(this.model.category, 'CategoryTinyResource'),
      },
    };
  }
}

module.exports = ProductResource
