'use strict'
const Hash = use('Hash');
const Env = use('Env');
const Common = use('App/Helpers/Common');
const Transformers = use('App/Helpers/Transformers');
/////////////////////////////////////////////////
const Model = use('App/Models/User');
const Resource='UserResource';
const ForgotPassword = use('App/Jobs/ForgotPassword');
const CreateUser = use('App/Jobs/CreateUser');

class AuthController {
  async login({request, response, auth}) {
    let {email, password} = request.all();
    let row = await Model.query().active().where('email', email).first();
    if (!row) {
      return response.status(403).json({'message': 'Invalid email'})
    }
    if (!row.confirmed) {
      return response.status(403).json({'message': 'This account is not confirmed'})
    }
    if (!await Hash.verify(password, row.password)) {
      return response.status(403).json({'message': 'Invalid password'})
    }
    await auth.revokeTokensForUser(row, null, true);
    let token = await auth.generate(row);
    if (token) {
      row.last_ip = request.ip();
      row.last_logged_in_at = Common.getDateTime();
      row.save();
      return response.json({
        message: "Logged successfully",
        token: token.token,
        data: Transformers.resource(row,Resource)
      })
    }
  }

  async register({request, response}) {
    let data = request.only(['name', 'email', 'mobile', 'password']);
    data['confirmed'] = Env.get('USER_CONFIRMED');
    if (data['confirmed'] == 0) {
      data['confirm_token'] = Common.generateString(128);
    }
    let row = await Model.create(data);
    if (row) {
      ///////////////Send email
      CreateUser.handle(row);
      ///////////////
      return response.status(201).json({
        message: "Registration is successfully",
        data: Transformers.resource(row,Resource)
      })
    }
    return response.status(400).json({message: "Failed to save"});
  }

  async forgotPassword({request, response, auth}) {
    let {email} = request.all()
    let row = await Model.query().active().where('email', email).first();
    if (!row) {
      return response.status(403).json({'message': 'Invalid email'})
    }
    row.password_token = Common.generateString(128);
    if(row.save()){
      ///////////////Send email
      ForgotPassword.handle(row);
      ///////////////
      return response.json({
        message: "An email sent with the instruction for changing your password",
      })
    }
    return response.status(400).json({message: "Failed to save"});
  }
}

module.exports = AuthController
