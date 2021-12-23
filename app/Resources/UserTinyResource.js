class UserTinyResource {
  model;

  constructor(row) {
    this.model = row;
  }

  toArray() {
    return {
      id: this.model.id,
      name: this.model.name,
      image: this.model.image,
    }
  }
}

module.exports = UserTinyResource
