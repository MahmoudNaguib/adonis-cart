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
}

module.exports = CommentsController
