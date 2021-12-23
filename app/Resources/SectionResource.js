const Transformers = use('App/Helpers/Transformers');
const dateFormat = require("dateformat");

class SectionResource {
  model;

  constructor(row) {
    this.model = row;
  }

  toArray() {
    return {
      type: 'sections',
      id: this.model.id,
      attributes: {
        id: this.model.id,
        title: this.model.title,
        image: this.model.image,
        is_active:this.model.is_active,
        created_at: dateFormat(new Date(this.model.created_at), "yyyy-mm-dd hh:MM:ss tt"),
        updated_at: dateFormat(new Date(this.model.updated_at), "yyyy-mm-dd hh:MM:ss tt"),
      }
    };
  }
}

module.exports = SectionResource

