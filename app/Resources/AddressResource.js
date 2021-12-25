const Transformers = use('App/Helpers/Transformers');
const dateFormat = require("dateformat");

class AddressResource {
  model;

  constructor(row) {
    this.model = row;
  }

  toArray() {
    return {
      type: 'addresses',
      id: this.model.id,
      attributes: {
        id: this.model.id,
        title: this.model.title,
        country_id: this.model.country_id,
        city: this.model.city,
        district: this.model.district,
        zip_code: this.model.zip_code,
        address: this.model.address,
        notes: this.model.notes,
        created_by: this.model.created_by,
        created_at: dateFormat(new Date(this.model.created_at), "yyyy-mm-dd hh:MM:ss tt"),
        updated_at: dateFormat(new Date(this.model.updated_at), "yyyy-mm-dd hh:MM:ss tt"),
      },
      relationships: {
        country: Transformers.resource(this.model.hasOwnProperty('country') ? this.model.country : {}, 'CountryTinyResource'),
      },
    };
  }
}

module.exports = AddressResource
