const Transformers = use('App/Helpers/Transformers');
const dateFormat = require("dateformat");

class UserResource {
  model;

  constructor(row) {
    this.model = row;
  }

  toArray() {
    return {
      type: 'users',
      id: this.model.id,
      attributes: {
        id: this.model.id,
        type: this.model.type,
        name: this.model.name,
        email: this.model.email,
        mobile: this.model.mobile,
        image: this.model.image,
        confirmed: this.model.confirmed,
        is_active: this.model.is_active,
        last_ip: this.model.last_ip,
        last_logged_in_at: (this.model.last_logged_in_at) ? dateFormat(new Date(this.model.last_logged_in_at), "yyyy-mm-dd hh:MM:ss tt") : null,
        created_at: dateFormat(new Date(this.model.created_at), "yyyy-mm-dd hh:MM:ss tt"),
        updated_at: dateFormat(new Date(this.model.updated_at), "yyyy-mm-dd hh:MM:ss tt"),
      }
    };
  }
}

module.exports = UserResource
