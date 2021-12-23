'use strict'
const Hash = use('Hash');
const Env = use('Env');
const Common = use('App/Helpers/Common');
const Transformers = use('App/Helpers/Transformers');
/////////////////////////////////////////////////
const Post = use('App/Models/Post');
const Model = use('App/Models/Comment');
const Resource='CommentResource';

class CommentsController {
  async index({params, request, response}) {
    let page = (request.input('page')) ? request.input('page') : 1;
    let post = await Post.query().active().where('id', params.id).first();
    let rows = await post.comments().relations().active().sort(request.all()).paginate(page, Env.get('PER_PAGE'));
    return Transformers.paginate(rows,Resource);
  }

  async store({params, request, response, auth}) {
    let post = await Post.query().active().where('id', params.id).first();
    if (!post) {
      return response.status(404).json({'message': 'Page not found'})
    }
    let data = request.only(['content']);
    data.created_by = auth.user.id;
    let row = await post.comments().create(data);
    if (row) {
      return response.status(201).json({
        message: "Created successfully",
        data: Transformers.resource(await Model.query().relations().where('id', row.id).first(),Resource)
      })
    }
    return response.status(400).json({message: "Failed to save"});
  }
}

module.exports = CommentsController
