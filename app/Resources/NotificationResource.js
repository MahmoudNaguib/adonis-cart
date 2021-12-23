const Transformers = use('App/Helpers/Transformers');
const dateFormat = require("dateformat");

class NotificationResource {
  model;

  constructor(row) {
    this.model = row;
  }

  toArray() {
    return {
      type: 'notifications',
      id: this.model.id,
      attributes: {
        id: this.model.id,
        user_id: this.model.user_id,
        content: this.model.content,
        entity_type: model.entity_type,
        entity_id: model.entity_id,
        seen_at: model.seen_at,
        send_email: model.send_email,
        send_push: model.send_push,
        created_at: dateFormat(new Date(this.model.created_at), "yyyy-mm-dd hh:MM:ss tt"),
        updated_at: dateFormat(new Date(this.model.updated_at), "yyyy-mm-dd hh:MM:ss tt"),
      },
    };
  }
}

module.exports = NotificationResource
