const Transformers = use('App/Helpers/Transformers');
const dateFormat = require("dateformat");

class PostResource {
  model;

  constructor(row) {
    this.model = row;
  }

  toArray() {
    return {
      type: 'posts',
      id: this.model.id,
      attributes: {
        id: this.model.id,
        section_id: this.model.section_id,
        title: this.model.title,
        content: this.model.content,
        image: this.model.image,
        tags: JSON.parse(this.model.tags),
        meta_keywords: this.model.meta_keywords,
        meta_description: this.model.meta_description,
        is_active: this.model.is_active,
        created_by: this.model.created_by,
        created_at: dateFormat(this.model.created_at, "yyyy-mm-dd hh:MM:ss tt"),
        updated_at: dateFormat(new Date(this.model.updated_at), "yyyy-mm-dd hh:MM:ss tt"),
      },
      relationships: {
        creator: Transformers.resource(this.model.hasOwnProperty('creator') ? this.model.creator : {}, 'UserTinyResource'),
        section: Transformers.resource(this.model.hasOwnProperty('section') ? this.model.section : {}, 'SectionTinyResource'),
      },
    };
  }
}

module.exports = PostResource
