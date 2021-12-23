'use strict'
const Hash = use('Hash');
const Env = use('Env');
const Common = use('App/Helpers/Common');
const Transformers = use('App/Helpers/Transformers');
/////////////////////////////////////////////////
const Resource = 'UserResource';
const Model = use('App/Models/User');
const ResizeImage = use('App/Helpers/ResizeImage');

class ProfileController {
  async index({request, response, auth}) {
    let row = auth.user;
    if (row) {
      return response.json({
        token: request.header('Authorization').replace("Bearer ", ""),
        data: Transformers.resource(row,Resource)
      })
    }
  }

  async logout({request, response, auth}) {
    if (await auth.revokeTokensForUser(auth.user, null, true)) {
      return response.json({
        message: "Logged out successfully",
      })
    }
  }

  async update({request, response, auth, transform}) {
    let row = await Model.findOrFail(auth.user.id);
    let data = request.only(['name', 'email', 'mobile']);
    /////// Save image
    if (request.file('image', {types: ['image'], size: '4mb'})) {
      let image = await ResizeImage.resize(request.file('image').tmpPath,
        {small: '200x150', large: '400x300'});
      if(image!=undefined && image!=''){
        data.image=image;
      }
    }
    /////////////////////
    if (await Model.query().where('id', auth.user.id).update(data)) {
      await auth.revokeTokensForUser(auth.user, null, true);
      let token = await auth.generate(row);
      if (token) {
        return response.json({
          message: "Update successfully",
          token: token.token,
          data: Transformers.resource(await Model.find(auth.user.id),Resource)
        })
      }
    }
    return response.status(400).json({message: "Failed to save"});
  }
}

module.exports = ProfileController
