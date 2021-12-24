const Transformers = use('App/Helpers/Transformers');
const dateFormat = require("dateformat");

class CommentResource {
  model;

  constructor(row) {
    this.model = row;
  }

  toArray() {
    return {
      type: 'comments',
      id: this.model.id,
      attributes: {
        id: this.model.id,
        post_id: this.model.post_id,
        content: this.model.content,
        is_active: this.model.is_active,
        created_by: this.model.created_by,
        created_at: dateFormat(new Date(this.model.created_at), "yyyy-mm-dd hh:MM:ss tt"),
        updated_at: dateFormat(new Date(this.model.updated_at), "yyyy-mm-dd hh:MM:ss tt"),
      },
      relationships: {
        creator: Transformers.resource(this.model.hasOwnProperty('creator') ? this.model.creator : {}, 'UserTinyResource'),
        post: Transformers.resource(this.model.hasOwnProperty('post') ? this.model.post : {}, 'PostTinyResource'),
      },
    };
  }
}

module.exports = CommentResource
