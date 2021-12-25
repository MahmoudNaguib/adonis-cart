class CountryTinyResource {
  model;

  constructor(row) {
    this.model = row;
  }

  toArray() {
    return {
      id: this.model.id,
      iso: this.model.iso,
      title: this.model.title,
    }
  }
}

module.exports = CountryTinyResource
