const Transformers = use('App/Helpers/Transformers');
const dateFormat = require("dateformat");

class CategoryResource {
  model;

  constructor(row) {
    this.model = row;
  }

  toArray() {
    return {
      type: 'categories',
      id: this.model.id,
      attributes: {
        id: this.model.id,
        parent_id: this.model.parent_id,
        title: this.model.title,
        image: this.model.image,
        is_active: this.model.is_active,
        created_at: dateFormat(new Date(this.model.created_at), "yyyy-mm-dd hh:MM:ss tt"),
        updated_at: dateFormat(new Date(this.model.updated_at), "yyyy-mm-dd hh:MM:ss tt"),
      },
      relationships: {
        children: Transformers.collection(this.model.hasOwnProperty('children') ? this.model.children : null, 'CategoryTinyResource'),
      },
    };
  }
}

module.exports = CategoryResource
