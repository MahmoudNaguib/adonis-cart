class PostTinyResource {
  model;

  constructor(row) {
    this.model = row;
  }

  toArray() {
    return {
      id: this.model.id,
      title: this.model.title,
      image: this.model.image,
    }
  }
}

module.exports = PostTinyResource
